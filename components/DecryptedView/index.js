import React from 'react'
import Button from '../Button'
import Input from '../Input'
import TextArea from '../TextArea'

export default function DecryptedView ({ decrypted, uuid, decryptKey }) {
  return (
    <div className="flex flex-col space-y-1">
      <TextArea
        rows={8}
        value={decrypted}
        readOnly
      />

      <Input label="UUID" value={uuid} readOnly />

      <Input
        label="Decryption key"
        type="password"
        value={decryptKey}
        readOnly

        onMouseEnter={(e) => {
          e.target.type = 'text'
        }}

        onMouseLeave={(e) => {
          e.target.type = 'password'
        }}
      />

      <Button onClick={() => navigator.clipboard.writeText(`https://paste.jsopn.xyz/${uuid}#${decryptKey}`)}>
        Copy URL (with password)
      </Button>
    </div>
  )
}
