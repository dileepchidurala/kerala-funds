const outlook = require('../../DetailsFolder/logindetails'),
  nodeoutlook = require('nodejs-nodemailer-outlook'),
  logfunc = require('../logs/logfunction');

const details = new outlook();

// https://github.com/nodemailer/nodemailer/issues/742

mailfunction = (user, name, amount) => {
  try {
    nodeoutlook.sendEmail({
      auth: {
        user: details.id,
        pass: details.passowrd
      },
      host: 'outlook.td.teradata.com',
      port: 25,
      from: 'TDCares.GDCPune@Teradata.com',
      to: user + '@teradata.com',
      subject: `Teradata Cares thanks you for Kerala Flood Relief Donation.`,
      html: `Hi ${name}, thank you for your contribution for Kerala Flood Relief. You donated INR ${amount}. The amount will be deducted from your next month salary by Payroll and will send out an letter of 80G.`,
      text: 'This is text version!'
    });
    logfunc(`${user} amount: ${amount}`, `9mailOk.txt`);
  } catch (error) {
    logfunc(`${user} amount: ${amount}`, `8mailError.txt`, true, error);
  }
};
exports.mailfunction = mailfunction;
