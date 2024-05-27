import Content from '../components/Content';
import Header from '../components/Header';

interface AppProps {
  number?: number;
}
export const getServerSideProps = () => {
  return {
    props: {
      number: 100,
    },
  };
};

export default function App({ number }: AppProps) {
  return (
    <div style={{ width: '100%' }}>
      <Header />
      <Content serverNumber={number} />
    </div>
  );
}
