interface EmailSenderArgs {
  destination: string
  token: string
}

const sendEmail = async ({ destination, token }: EmailSenderArgs) => {
  console.log(`Sending token ${token} to ${destination}`)
}

export default sendEmail
