import React, {useState} from 'react';
import {Text} from 'react-native';
import {LingerButton, LingerInput, ModalContainer} from '../containers';
import {useTrackPlayer} from '../context/playerContext';

type Props = {
  close: () => void;
};

export default function SleepEdit({close}: Props) {
  const [timer, setTimer] = useState('');
  const {setSleepDate} = useTrackPlayer();
  const startTimer = (x: number) => {
    const currentDate = new Date();
    setSleepDate(new Date(currentDate.getTime() + x * 60 * 1_000));
  };
  return (
    <ModalContainer>
      <Text>Minutes until sleep:</Text>
      <LingerInput value={timer} onChangeText={setTimer} inputMode="numeric" />
      <LingerButton
        title="set"
        disabled={Number(timer) < 1}
        onPress={() => {
          startTimer(Number(timer));
          close();
        }}
      />
    </ModalContainer>
  );
}
