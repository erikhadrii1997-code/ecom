export default function WorkingPage() {
  return (
    <div style={{ 
      padding: '20px', 
      backgroundColor: 'red', 
      color: 'white', 
      fontSize: '24px',
      minHeight: '100vh'
    }}>
      <h1>This page is working!</h1>
      <p>If you can see this, the app is rendering correctly.</p>
      <p>Time: {new Date().toLocaleString()}</p>
    </div>
  )
}