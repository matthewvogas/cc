import {
  Body,
  Button,
  Container,
  Column,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Row,
  Section,
  Text,
} from '@react-email/components'

import * as React from 'react'

interface YelpRecentLoginEmailProps {
  baseURL: string
  agencyName?: string
  loginDate?: Date
  loginDevice?: string
  loginLocation?: string
  loginIp?: string
}

export const YelpRecentLoginEmail = ({
  baseURL,
  loginDate = new Date('September 7, 2022, 10:58 am'),
}: YelpRecentLoginEmailProps) => {
  baseURL ||= 'http://localhost:3000'
  const formattedDate = new Intl.DateTimeFormat('en', {
    dateStyle: 'long',
    timeStyle: 'short',
  }).format(loginDate)

  const featuresList = [
    'Never send a single stats screenshot again',
    'The agency can track all post results',
    'Your work is presented beautifully to brands',
  ]

  return (
    <Html>
      <Head />
      <Preview>Yelp recent login</Preview>
      <Body style={main}>
        <Container>
          <Section style={logo}>
            <Img
              width={114}
              src={`https://golabsdewinu.s3.amazonaws.com/email/codecoco.png`}
            />
          </Section>
          <Section
            style={{
              ...content,
              backgroundImage: `url(https://golabsdewinu.s3.amazonaws.com/email/bg-invitationMail-computer.jpg)`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}>
            <Row style={{ ...boxInfos, paddingBottom: '0' }}>
              <Column style={{ paddingBottom: '120px', paddingTop: '80px' }}>
                <Heading
                  style={{
                    fontSize: 24,
                    fontWeight: 'medium',
                    textAlign: 'center',
                  }}>
                  🥥
                </Heading>

                <Heading
                  as='h2'
                  style={{
                    fontSize: 22,
                    fontWeight: 'normal',
                    textAlign: 'center',
                    color: '#fff',
                  }}>
                  You have been invited to connect on Codecoco
                </Heading>

                <Row style={{ ...boxInfos, paddingTop: '0' }}>
                  <Column style={containerButton} colSpan={2}>
                    <a href='https://dev.codecoco.co/login' style={button}>
                      connect now
                    </a>
                  </Column>
                </Row>
              </Column>
            </Row>
          </Section>

          <Section style={features}>
            <Row style={{ ...boxInfos, paddingBottom: '0' }}>
              <Column>
                <Heading
                  as='h2'
                  style={{
                    fontSize: 24,
                    fontWeight: 'normal',
                    textAlign: 'center',
                    color: '#000',
                    marginBottom: '40px',
                  }}>
                  Codecoco will collect your campaign stats for so
                  you don’t have to share them to with screenshots!
                </Heading>
                {featuresList.map((feature, index) => (
                  <div
                    style={{
                      display: 'flex',
                      gap: '8px',
                      alignItems: 'center',
                    }}>
                    <Img
                      height={24}
                      width={24}
                      style={{ opacity: '40%' }}
                      src={`https://golabsdewinu.s3.amazonaws.com/email/check.png`}
                    />
                    <p
                      style={{
                        fontSize: 18,
                        fontWeight: 'normal',
                        textAlign: 'left',
                        color: '#000',
                      }}
                      key={index}>
                      {' '}
                      {feature}
                    </p>
                  </div>
                ))}

                <Img
                  width='100%'
                  src={`https://golabsdewinu.s3.amazonaws.com/email/SuccesfullyCreatorConnectionImage.png`}
                />
              </Column>
            </Row>
          </Section>

          <Section style={cta}>
            <Row style={{ ...boxInfos, paddingBottom: '0' }}>
              <Column>
                <Heading
                  as='h2'
                  style={{
                    fontSize: 24,
                    fontWeight: 'bold',
                    textAlign: 'center',
                    color: '#000',
                  }}>
                  Connecting does not allow Codecoco or the Agency to login,
                  post, or manage on your behalf.
                </Heading>
                <p
                  style={{
                    fontSize: 18,
                    fontWeight: 'normal',
                    textAlign: 'center',
                    color: '#000',
                  }}>
                  {' '}
                  We don’t have access to or save your admin information,
                  messages, notifications, contacts, etc. Codecoco only pulls
                  your post stats. Everything is encrypted and safe.
                </p>
              </Column>
            </Row>

            <Row style={{ ...boxInfos, paddingBottom: '40px' }}>
              <Column style={containerButton} colSpan={2}>
                <a
                  href=''
                  style={{
                    ...ctaButton,
                    backgroundColor: '#DFF2E8',
                    marginBottom: '20px',
                  }}>
                  connect now 🥥
                </a>
              </Column>
              <Column style={containerButton} colSpan={2}>
                <a href='' style={{ ...ctaButton, backgroundColor: '#F6E9E3' }}>
                  more about Codecoco 🥥{' '}
                </a>
              </Column>
            </Row>
          </Section>

          <Text
            style={{
              textAlign: 'center',
              fontSize: 12,
              color: 'rgb(0,0,0, 0.7)',
            }}>
            © 2023 | Codecoco | codecoco.co
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

export default YelpRecentLoginEmail

const main = {
  backgroundColor: '#fff',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
}

const logo = {
  display: 'flex',
  justifyContent: 'center',
  alingItems: 'center',
  padding: 30,
}

const containerButton = {
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
}

const button = {
  backgroundColor: '',
  padding: '15px 40px',
  borderRadius: 1000,
  color: '#FFF',
  fontWeight: 'bold',
  border: '1px solid #fff',
  cursor: 'pointer',
  textDecoration: 'none',
}

const ctaButton = {
  padding: '15px 40px',
  borderRadius: 1000,
  color: '#000',
  fontWeight: 'normal',
  border: '1px solid #fff',
  cursor: 'pointer',
  textDecoration: 'none',
}

const content = {
  overflow: 'hidden',
  backgroundColor: '#000',
}

const features = {
  overflow: 'hidden',
  backgroundColor: '#F2EDE7',
}

const cta = {
  overflow: 'hidden',
  backgroundColor: '#fff',
}

const boxInfos = {
  padding: '20px 40px',
}
