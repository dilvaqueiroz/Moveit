import Head from 'next/head';
import {GetServerSideProps} from 'next';

import { CompletedChallenges } from "../components/CompletedChallenges";
import { CountdownProvider } from '../contexts/CountdownContext';
import { Countdown } from "../components/Countdown";
import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from "../components/Profile";
import { ChallengeBox } from "../components/ChallengeBox";

import styles from '../styles/pages/Home.module.css';
import { ChallengesProvider } from '../contexts/ChallengesContext';

interface HomeProps {
  level:number;
  currentExperience: number;
  challengesCompleted: number;
}

export default function Home(props:HomeProps) {
 // console.log(props);
  return (
    <ChallengesProvider 
    level={props.level} 
    currentExperience={props.currentExperience}
    challengesCompleted={props.challengesCompleted}
    >
    <div className={styles.container}>
      <Head>
        <title>Início | move.it </title>
      </Head>
      <ExperienceBar/>

      <CountdownProvider>
        <section>
          <div>
            <Profile/>
            <CompletedChallenges/>
            <Countdown/>
          </div>
          <div>
            <ChallengeBox/>
          </div>
        </section>
      </CountdownProvider>
    </div> 
    </ChallengesProvider>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
 
/*  const user = {
    level: 1,
    currentExperience: 50,
    challengesCompleted: 2,
  } 
*/
  const {level, currentExperience, challengeCompleted} = ctx.req.cookies;

//  console.log(user);

  return {
    props:{
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengeCompleted: Number(challengeCompleted),
    }
  }
}