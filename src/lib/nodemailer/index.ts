import nodemailer from 'nodemailer';

// const transporter = nodemailer.createTransport({
// 	service: 'smtp.ethereal.email',
// 	port: process.env.SMTP_PORT || 587,
// 	secure: process.env.SMTP_PORT ?? false,
// 	auth: {
// 		user: process.env.SMTP_USER || '',
// 		pass: process.env.SMTP_PASS || '',
// 	},
// });

// async..await is not allowed in global scope, must use a wrapper
async function main() {
	// send mail with defined transport object
	const info = await transporter.sendMail({
		from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', // sender address
		to: 'bar@example.com, baz@example.com', // list of receivers
		subject: 'Hello ✔', // Subject line
		text: 'Hello world?', // plain text body
		html: '<b>Hello world?</b>', // html body
	});

	console.log('Message sent: %s', info.messageId);
	// Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}

export const sendScheduleServiceEmail = (messageContent) => {
  const { name, familyName, tel, email, location, service, message } = messageContent;
	const transporter = nodemailer.createTransport({
		service: process.env.SMTP_HOST,
		auth: {
			user: process.env.SMTP_USER,
			pass: process.env.SMTP_PASS,
		},
	});

  const mailOptions = {
    from: process.env.SMTP_USER,
    to: process.env.SMTP_USER,
    subject: 
  }
	// From - me (.env)
	// Text -
	// To - me (.env)
	// Subject - A customer would like to schedule ______ service with you
	// HTML?
	// 	- Users given name & family name
	// - Users Tel
	//  - Users Email
	//  - Location
	//  - Service requested
	//  - User Message
};

main().catch(console.error);
