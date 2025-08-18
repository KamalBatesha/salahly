import React from 'react'
import HeroSection from '../../components/Home/HeroSection'
import OurServices from '../../components/Home/ourServies'
import WhyUse from '../../components/Home/whyUs'
import DownloadApp from '../../components/Home/downloadApp'
import Feedback from '../../components/Home/Feedback'

const UserHome = () => {
  return (
    <div>
      <HeroSection />
      <OurServices />
      <WhyUse />
      <DownloadApp />
      <Feedback />
    </div>
  )
}

export default UserHome
