import { useEffect, useState } from 'react'
import liff from '@line/liff'
import './App.css'

function App() {
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [name, setName] = useState('')
  const [liffObject, setLiffObject] = useState(null)

  useEffect(() => {
    liff
      .init({
        liffId: import.meta.env.VITE_LIFF_ID,
      })
      .then(() => {
        setMessage('LIFF init succeeded.')
        setLiffObject(liff)
        liff
          .getProfile()
          .then((profile) => {
            setName(profile.displayName)
          })
          .catch((err) => {
            console.log('error', err)
          })
      })
      .catch((e) => {
        setMessage('LIFF init failed.')
        setError(`${e}`)
      })
  })

  const sendMessage = async () => {
    if (!liffObject) return

    try {
      await liffObject.sendMessages([
        {
          type: 'text',
          text: 'こんにちは！これはLINEミニアプリからのメッセージです🚀',
        },
      ])
      alert('メッセージを送信しました！')
    } catch (error) {
      console.error('メッセージ送信エラー:', error)
      alert('メッセージ送信に失敗しました')
    }
  }

  return (
    <div className="App">
      {message && <p>{message}</p>}
      {error && (
        <p>
          <code>{error}</code>
        </p>
      )}
      {name && <p>こんにちは、{name}さん</p>}
      <button onClick={sendMessage}>メッセージを送信</button>
      {error && <p style={{ color: 'red' }}>エラー: {error}</p>}
    </div>
  )
}

export default App
