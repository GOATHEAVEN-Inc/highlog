import * as S from '@/pages/home/Home.styles';
import HookingSection from '@/features/home/HookingSection';
import InstantAnswerSection from '@/features/home/InstantAnswerSection';
import DifferentSection from '@/features/home/DifferentSection';
import InfoSection from '@/features/home/InfoSection';
import AutoScrollCardSection from '@/features/home/AutoScrollCardSection';
import ForStudentSection from '@/features/home/ForStudentSection';

export default function Home() {
  return (
    <S.Container>
      <InstantAnswerSection />
      <HookingSection />
      <DifferentSection />
      <InfoSection />
      <ForStudentSection />
      <AutoScrollCardSection />
    </S.Container>
  );
};
