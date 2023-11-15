import {Html, Head, Tailwind, Preview, Body, Container, Heading, Hr, Text} from '@react-email/components'

function BurialMail(props) {
  const {name, email, phone, message} = props.data

  return (
    <Html>
      <Head />
      <Preview>Green burial inquery received from {name}</Preview>
      <Tailwind>
        <Body className="bg-stone-300 text-slate-900 mx-auto font-sans">
          <Container className="">
            <Heading className="text-xl">Green Burial Inquery Received</Heading>
            <Hr />
            <Text className="">
              From: {name}, {email}, {phone}
            </Text>
            <Text>
              Message:
              <br />
              {message}
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}

export default BurialMail
