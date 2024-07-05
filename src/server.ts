import { ApolloServer, BaseContext } from '@apollo/server';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { constraintDirective, constraintDirectiveTypeDefs } from 'graphql-constraint-directive';

import typeDefs from './schema';
import resolvers from './resolvers';
import { startServerAndCreateLambdaHandler, handlers, middleware } from '@as-integrations/aws-lambda';
import dotenv from 'dotenv';

dotenv.config();

let schema = makeExecutableSchema({
	typeDefs: [constraintDirectiveTypeDefs, typeDefs],
	resolvers,
});

schema = constraintDirective()(schema);

const server = new ApolloServer<BaseContext>({
	schema,
	introspection: true,
});

const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || [];
const requestHandler = handlers.createAPIGatewayProxyEventV2RequestHandler();

const corsMiddleware: middleware.MiddlewareFn<typeof requestHandler> = async (event) => {
	const origin = event.headers.origin;
	if (origin && allowedOrigins.includes(origin)) {
		console.log("origin allowed", origin);
		return (result) => {
			result.headers = {
				...result.headers,
				'Access-Control-Allow-Origin': origin,
				Vary: 'Origin',
			};
			return Promise.resolve();
		};
	} else {
		
		return (result) => {
			result.statusCode = 403;
			result.body = 'Origin not allowed' + origin;
			return Promise.resolve();
		};
	}
};

export const handler = startServerAndCreateLambdaHandler(server, handlers.createAPIGatewayProxyEventV2RequestHandler(), {
	middleware: [corsMiddleware],
});
