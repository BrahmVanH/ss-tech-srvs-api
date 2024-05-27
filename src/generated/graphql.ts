import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Amenity = {
  __typename?: 'Amenity';
  amenityName: Scalars['String']['output'];
  amenityType: Scalars['String']['output'];
};

export type AmenityInput = {
  amenityName: Scalars['String']['input'];
  amenityType: Scalars['String']['input'];
};

export type Auth = {
  __typename?: 'Auth';
  token: Scalars['ID']['output'];
  user: User;
};

export type Booking = {
  __typename?: 'Booking';
  _id: Scalars['ID']['output'];
  dateValue: Scalars['String']['output'];
  propertyId: Scalars['ID']['output'];
};

export type CreateBookingInput = {
  bookings?: InputMaybe<Array<NewBookingInput>>;
};

export type CreateUserInput = {
  adminCode: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  userPassword: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type DeleteS3ObjectInput = {
  imgKeys: Array<Scalars['String']['input']>;
};

export type DeleteS3ObjectResponse = {
  __typename?: 'DeleteS3ObjectResponse';
  message: Scalars['String']['output'];
  status: Scalars['Int']['output'];
};

export type LoginUserInput = {
  userPassword: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createBooking: Array<Maybe<Booking>>;
  createUser: Auth;
  deleteS3Objects: DeleteS3ObjectResponse;
  loginUser: Auth;
  removeBooking: RemoveBookingResponse;
  removeUser: Auth;
  updatePropertyInfo: Property;
};


export type MutationCreateBookingArgs = {
  input: CreateBookingInput;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationDeleteS3ObjectsArgs = {
  input: DeleteS3ObjectInput;
};


export type MutationLoginUserArgs = {
  input: LoginUserInput;
};


export type MutationRemoveBookingArgs = {
  input: RemoveBookingInput;
};


export type MutationRemoveUserArgs = {
  input: RemoveUserInput;
};


export type MutationUpdatePropertyInfoArgs = {
  input: UpdatePropertyInput;
};

export type NewBookingInput = {
  dateValue: Scalars['String']['input'];
  propertyId: Scalars['ID']['input'];
};

export type Property = {
  __typename?: 'Property';
  _id: Scalars['ID']['output'];
  amenities: Array<Amenity>;
  bookings?: Maybe<Array<Booking>>;
  headerImgKey: Scalars['String']['output'];
  propertyDescription: Scalars['String']['output'];
  propertyName: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  getAboutPgImg: Scalars['String']['output'];
  getAllUsers?: Maybe<Array<User>>;
  getCottageImgs: CottageImgPack;
  getHideawayImgs: HideawayImgPack;
  getHomePgImgs: HomePgImgPack;
  getPresignedS3Url: Scalars['String']['output'];
  getProperties: Array<Property>;
  getPropertyInfo: Property;
  queryBookingsByProperty?: Maybe<Array<Booking>>;
};


export type QueryGetPresignedS3UrlArgs = {
  altTag: Scalars['String']['input'];
  commandType: Scalars['String']['input'];
  imgKey: Scalars['String']['input'];
};


export type QueryGetPropertyInfoArgs = {
  _id: Scalars['ID']['input'];
};


export type QueryQueryBookingsByPropertyArgs = {
  propertyId: Scalars['ID']['input'];
};

export type RemoveBookingInput = {
  bookingIds: Array<Scalars['ID']['input']>;
};

export type RemoveBookingResponse = {
  __typename?: 'RemoveBookingResponse';
  deletedCount: Scalars['Int']['output'];
};

export type RemoveUserInput = {
  userPassword: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type Update = {
  amenities?: InputMaybe<Array<AmenityInput>>;
  headerImgKey: Scalars['String']['input'];
  propertyDescription: Scalars['String']['input'];
  propertyName: Scalars['String']['input'];
};

export type UpdatePropertyInput = {
  _id: Scalars['ID']['input'];
  update: Update;
};

export type User = {
  __typename?: 'User';
  _id?: Maybe<Scalars['ID']['output']>;
  firstName: Scalars['String']['output'];
  lastName: Scalars['String']['output'];
  password?: Maybe<Scalars['String']['output']>;
  username: Scalars['String']['output'];
};

export type CottageImgPack = {
  __typename?: 'cottageImgPack';
  galleryArray: Array<ImageObject>;
  headerUrl: Scalars['String']['output'];
};

export type HideawayImgPack = {
  __typename?: 'hideawayImgPack';
  galleryArray: Array<ImageObject>;
  headerUrl: Scalars['String']['output'];
};

export type HomePgImgPack = {
  __typename?: 'homePgImgPack';
  cottageImgUrl: Scalars['String']['output'];
  headerImgUrl: Scalars['String']['output'];
  hideawayImgUrl: Scalars['String']['output'];
};

export type ImageObject = {
  __typename?: 'imageObject';
  imgKey: Scalars['String']['output'];
  original: Scalars['String']['output'];
  originalAlt: Scalars['String']['output'];
  thumbnail: Scalars['String']['output'];
  thumbnailAlt: Scalars['String']['output'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Amenity: ResolverTypeWrapper<Amenity>;
  AmenityInput: AmenityInput;
  Auth: ResolverTypeWrapper<Auth>;
  Booking: ResolverTypeWrapper<Booking>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  CreateBookingInput: CreateBookingInput;
  CreateUserInput: CreateUserInput;
  DeleteS3ObjectInput: DeleteS3ObjectInput;
  DeleteS3ObjectResponse: ResolverTypeWrapper<DeleteS3ObjectResponse>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  LoginUserInput: LoginUserInput;
  Mutation: ResolverTypeWrapper<{}>;
  NewBookingInput: NewBookingInput;
  Property: ResolverTypeWrapper<Property>;
  Query: ResolverTypeWrapper<{}>;
  RemoveBookingInput: RemoveBookingInput;
  RemoveBookingResponse: ResolverTypeWrapper<RemoveBookingResponse>;
  RemoveUserInput: RemoveUserInput;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Update: Update;
  UpdatePropertyInput: UpdatePropertyInput;
  User: ResolverTypeWrapper<User>;
  cottageImgPack: ResolverTypeWrapper<CottageImgPack>;
  hideawayImgPack: ResolverTypeWrapper<HideawayImgPack>;
  homePgImgPack: ResolverTypeWrapper<HomePgImgPack>;
  imageObject: ResolverTypeWrapper<ImageObject>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Amenity: Amenity;
  AmenityInput: AmenityInput;
  Auth: Auth;
  Booking: Booking;
  Boolean: Scalars['Boolean']['output'];
  CreateBookingInput: CreateBookingInput;
  CreateUserInput: CreateUserInput;
  DeleteS3ObjectInput: DeleteS3ObjectInput;
  DeleteS3ObjectResponse: DeleteS3ObjectResponse;
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  LoginUserInput: LoginUserInput;
  Mutation: {};
  NewBookingInput: NewBookingInput;
  Property: Property;
  Query: {};
  RemoveBookingInput: RemoveBookingInput;
  RemoveBookingResponse: RemoveBookingResponse;
  RemoveUserInput: RemoveUserInput;
  String: Scalars['String']['output'];
  Update: Update;
  UpdatePropertyInput: UpdatePropertyInput;
  User: User;
  cottageImgPack: CottageImgPack;
  hideawayImgPack: HideawayImgPack;
  homePgImgPack: HomePgImgPack;
  imageObject: ImageObject;
};

export type AmenityResolvers<ContextType = any, ParentType extends ResolversParentTypes['Amenity'] = ResolversParentTypes['Amenity']> = {
  amenityName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  amenityType?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AuthResolvers<ContextType = any, ParentType extends ResolversParentTypes['Auth'] = ResolversParentTypes['Auth']> = {
  token?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BookingResolvers<ContextType = any, ParentType extends ResolversParentTypes['Booking'] = ResolversParentTypes['Booking']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  dateValue?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  propertyId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DeleteS3ObjectResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['DeleteS3ObjectResponse'] = ResolversParentTypes['DeleteS3ObjectResponse']> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createBooking?: Resolver<Array<Maybe<ResolversTypes['Booking']>>, ParentType, ContextType, RequireFields<MutationCreateBookingArgs, 'input'>>;
  createUser?: Resolver<ResolversTypes['Auth'], ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'input'>>;
  deleteS3Objects?: Resolver<ResolversTypes['DeleteS3ObjectResponse'], ParentType, ContextType, RequireFields<MutationDeleteS3ObjectsArgs, 'input'>>;
  loginUser?: Resolver<ResolversTypes['Auth'], ParentType, ContextType, RequireFields<MutationLoginUserArgs, 'input'>>;
  removeBooking?: Resolver<ResolversTypes['RemoveBookingResponse'], ParentType, ContextType, RequireFields<MutationRemoveBookingArgs, 'input'>>;
  removeUser?: Resolver<ResolversTypes['Auth'], ParentType, ContextType, RequireFields<MutationRemoveUserArgs, 'input'>>;
  updatePropertyInfo?: Resolver<ResolversTypes['Property'], ParentType, ContextType, RequireFields<MutationUpdatePropertyInfoArgs, 'input'>>;
};

export type PropertyResolvers<ContextType = any, ParentType extends ResolversParentTypes['Property'] = ResolversParentTypes['Property']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  amenities?: Resolver<Array<ResolversTypes['Amenity']>, ParentType, ContextType>;
  bookings?: Resolver<Maybe<Array<ResolversTypes['Booking']>>, ParentType, ContextType>;
  headerImgKey?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  propertyDescription?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  propertyName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  getAboutPgImg?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  getAllUsers?: Resolver<Maybe<Array<ResolversTypes['User']>>, ParentType, ContextType>;
  getCottageImgs?: Resolver<ResolversTypes['cottageImgPack'], ParentType, ContextType>;
  getHideawayImgs?: Resolver<ResolversTypes['hideawayImgPack'], ParentType, ContextType>;
  getHomePgImgs?: Resolver<ResolversTypes['homePgImgPack'], ParentType, ContextType>;
  getPresignedS3Url?: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<QueryGetPresignedS3UrlArgs, 'altTag' | 'commandType' | 'imgKey'>>;
  getProperties?: Resolver<Array<ResolversTypes['Property']>, ParentType, ContextType>;
  getPropertyInfo?: Resolver<ResolversTypes['Property'], ParentType, ContextType, RequireFields<QueryGetPropertyInfoArgs, '_id'>>;
  queryBookingsByProperty?: Resolver<Maybe<Array<ResolversTypes['Booking']>>, ParentType, ContextType, RequireFields<QueryQueryBookingsByPropertyArgs, 'propertyId'>>;
};

export type RemoveBookingResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['RemoveBookingResponse'] = ResolversParentTypes['RemoveBookingResponse']> = {
  deletedCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  _id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  firstName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  lastName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  password?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CottageImgPackResolvers<ContextType = any, ParentType extends ResolversParentTypes['cottageImgPack'] = ResolversParentTypes['cottageImgPack']> = {
  galleryArray?: Resolver<Array<ResolversTypes['imageObject']>, ParentType, ContextType>;
  headerUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type HideawayImgPackResolvers<ContextType = any, ParentType extends ResolversParentTypes['hideawayImgPack'] = ResolversParentTypes['hideawayImgPack']> = {
  galleryArray?: Resolver<Array<ResolversTypes['imageObject']>, ParentType, ContextType>;
  headerUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type HomePgImgPackResolvers<ContextType = any, ParentType extends ResolversParentTypes['homePgImgPack'] = ResolversParentTypes['homePgImgPack']> = {
  cottageImgUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  headerImgUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  hideawayImgUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ImageObjectResolvers<ContextType = any, ParentType extends ResolversParentTypes['imageObject'] = ResolversParentTypes['imageObject']> = {
  imgKey?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  original?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  originalAlt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  thumbnail?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  thumbnailAlt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Amenity?: AmenityResolvers<ContextType>;
  Auth?: AuthResolvers<ContextType>;
  Booking?: BookingResolvers<ContextType>;
  DeleteS3ObjectResponse?: DeleteS3ObjectResponseResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Property?: PropertyResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  RemoveBookingResponse?: RemoveBookingResponseResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  cottageImgPack?: CottageImgPackResolvers<ContextType>;
  hideawayImgPack?: HideawayImgPackResolvers<ContextType>;
  homePgImgPack?: HomePgImgPackResolvers<ContextType>;
  imageObject?: ImageObjectResolvers<ContextType>;
};

