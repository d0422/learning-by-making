import { useState } from '@core/useState';

export default function Content({ serverNumber }: { serverNumber?: number }) {
  const [number, setNumber] = useState<number>(serverNumber || 0);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '30px',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: '25px',
          gap: '15px',
        }}
      >
        <div>Your Number : </div>
        <div style={{ fontWeight: 700 }}>{number}</div>
      </div>
      <button
        onclick={() => setNumber(number + 1)}
        style={{
          display: 'flex',
          justifyContent: 'center',
          borderRadius: '25px',
          backgroundColor: 'black',
          color: 'white',
          fontSize: '20px',
          paddingTop: '15px',
          paddingBottom: '15px',
          paddingRight: '25px',
          paddingLeft: '25px',
        }}
      >
        Click This!
      </button>
    </div>
  );
}
