export const getServerSideProps = () => {
  return {
    props: {
      string: `Hello Wolrd! I'm Project`,
    },
  };
};
export default function Project({ string }: { string: string }) {
  return <div>{string}</div>;
}
