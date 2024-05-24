export default function Content() {
  return (
    <div>
      <h1
        style={{
          color: 'red',
        }}
      >
        제목1
      </h1>
      <div
        style={{
          display: 'flex',
          gap: '30px',
        }}
      >
        {[1, 2, 3, 4, 5].map((number) => (
          <div>{number}</div>
        ))}
      </div>
    </div>
  );
}
