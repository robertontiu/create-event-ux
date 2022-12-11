import Head from 'next/head'
import { Fragment, useState } from 'react'
import { CreateEventDrawer } from '~/components/CreateEventDrawer'
import { CreateEventTrigger } from '~/components/CreateEventTrigger'

export default function Home() {
  const [isDrawerVisible, setIsDrawerVisible] = useState(false)

  return (
    <Fragment>
      <Head>
        <title>Create Event UX</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CreateEventTrigger onClick={() => setIsDrawerVisible(true)} />
      <CreateEventDrawer open={isDrawerVisible} />
    </Fragment>
  )
}
