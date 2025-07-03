"use client"

import { useCalls } from './CallsProvider';
import IncommingCall from './IncommingCall';
import CallInterface from './CallInterface';

export default function CallRenderer() {

  const { callData } = useCalls();
  const { callToken, onGoingCall } = callData;


  if (!onGoingCall) return <></>

  if (callToken) return <CallInterface />

  return (<IncommingCall />)

}
