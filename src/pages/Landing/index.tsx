import MentalHealth1Json from '../../assets/mental_health1.json';
import MentalHealth2Json from '../../assets/mental_health2.json';
import MentalHealth3Json from '../../assets/mental_health3.json';
import MentalHealth4Json from '../../assets/mental_health4.json';
import MentalHealth5Json from '../../assets/mental_health5.json';
import LandingContent from '../../components/LandingContent';
import styles from './landing.module.scss';

const content = [
  {
    headingText: 'Connect with a Supportive Community',
    info: 'Engage in open and compassionate discussions with like-minded individuals who understand the challenges and triumphs of the mental health journey. Form connections that can inspire, motivate, and offer a sense of belonging.',
    lottieJson: MentalHealth1Json,
  },
  {
    headingText: 'Access Expert Insights',
    info: 'Gain access to a diverse network of professional medical experts, therapists, and counselors who are ready to provide valuable insights and guidance. Our team of experienced practitioners is committed to helping you navigate the complexities of mental health.',
    lottieJson: MentalHealth2Json,
  },
  {
    headingText: 'Explore Specific Topics',
    info: `Dive deep into specific mental health topics that matter to you. Whether you're seeking advice on anxiety, depression, relationships, self-care, or any other aspect of mental well-being, Psych-Buddy offers dedicated discussion threads and resources tailored to your needs.`,
    lottieJson: MentalHealth3Json,
  },
  {
    headingText: 'Protect Your Privacy',
    info: 'We understand the importance of confidentiality when discussing sensitive matters. Psych-Buddy prioritizes your privacy, ensuring that all discussions are secure and anonymous, giving you the freedom to express yourself openly and honestly.',
    lottieJson: MentalHealth4Json,
  },
  {
    headingText: 'Enhance Your Knowledge',
    info: 'Expand your understanding of mental health through our vast library of educational resources. Access articles, podcasts, videos, and interactive tools created by experts to empower you with knowledge and practical strategies for managing your mental well-being.',
    lottieJson: MentalHealth5Json,
  },
];

const Landing = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <span>Welcome to Psych-Buddy: Your Trusted Mental Health Discussion Platform</span>
        <span>Connect. Share. Grow.</span>
        <span>
          Discover a safe and inclusive space where individuals and professional medical experts
          come together to foster meaningful discussions about mental health. Welcome to
          Psych-Buddy, the innovative platform designed to support your mental well-being through
          enlightening conversations and personalized guidance.
        </span>
      </div>

      <div className={styles.sub_heading}>
        <span>Why choose Psych-buddy?</span>
      </div>

      <div className={styles.main_content_wrapper}>
        {content &&
          content.map((e, index) => <LandingContent {...e} key={index} invert={index % 2 !== 0} />)}
      </div>
    </div>
  );
};

export default Landing;
