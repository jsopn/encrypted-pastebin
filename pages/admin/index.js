import React, { useState, useEffect } from 'react'
import Cookies from 'cookies'
import APIHelper from '../../helpers/APIHelper'
import Layout from '../../components/Layout'
import Button from '../../components/Button'
import Input from '../../components/Input'
import Moment from 'moment'
import Table, { DataCell, HeaderCell } from '../../components/Table'

export async function getServerSideProps ({ req, res }) {
  try {
    const cookies = new Cookies(req, res)
    const jwt = cookies.get('jwt')

    if (!jwt) {
      return {
        redirect: { permanent: false, destination: '/admin/login' }
      }
    }

    APIHelper.setToken(jwt)
    const user = await APIHelper.getUser()
    if (!user.success) {
      return {
        redirect: { permanent: false, destination: '/admin/login' }
      }
    }

    return { props: {} }
  } catch (e) {
    return {
      redirect: {
        permanent: false,
        destination: '/admin/login'
      }
    }
  }
}

export default function AdminHome () {
  const [pastes, setPastes] = useState([])
  const [count, setCount] = useState(0)
  const [page, setPage] = useState(0)
  const [uuid, setUUID] = useState('')
  const pages = count > 10 ? Array(Math.ceil(count / 10)) : Array(1)

  const updatePages = async (page) => {
    const respCount = await APIHelper.getTotalEntries()
    setCount(respCount)

    const respPastes = await APIHelper.listPastes(10, page * 10)
    setPastes(respPastes)
  }

  useEffect(async () => {
    updatePages(page)
  }, [])

  const changePage = async (pg) => {
    setPage(pg)
    updatePages(pg)
  }

  const deletePaste = async (uuid) => {
    await APIHelper.deletePaste(uuid)

    updatePages(page)
  }

  const queryPaste = async (uuid) => {
    if (!uuid) return updatePages(page)

    try {
      const resp = await APIHelper.getPaste(uuid)
      setPastes([resp.data])
      setCount(1)
    } catch (e) {
      setPastes([])
      setCount(0)
    }
  }

  return (
    <Layout>
      <div className="flex flex-col space-y-3">
        <Input
          type="text"
          label="UUID Search"
          value={uuid}
          onChange={e => setUUID(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && queryPaste(uuid)}
          placeholder="Press enter to find..."
        />

        {pastes.length > 0 && (
          <Table>
            <tr>
              <HeaderCell>UUID</HeaderCell>
              <HeaderCell>IP</HeaderCell>
              <HeaderCell>Created at</HeaderCell>
              <HeaderCell>Actions</HeaderCell>
            </tr>

            {pastes.map(p => (
              <tr key={p.uuid}>
                <DataCell>
                  {p.uuid}
                </DataCell>
                <DataCell>
                  <a className="text-gray-400 hover:text-gray-200" target="_blank" href={`https://check-host.net/ip-info?host=${p.ip}`} rel="noreferrer">
                    {p.ip}
                  </a>
                </DataCell>
                <DataCell>
                  {Moment(p.createdAt).fromNow()}
                  <small className="text-gray-500"> ({Moment(p.createdAt).format()}) </small>
                </DataCell>
                <DataCell>
                  <Button onClick={() => deletePaste(p.uuid)}>
                    Delete paste
                  </Button>
                </DataCell>
              </tr>
            ))}
          </Table>
        )}

        {pastes.length === 0 && <h1 className="text-center p-10">No data for this page</h1>}

        <div className="flex flex-row justify-center space-x-2">
          {Array.from(pages).map((_, i) => (
            <Button key={i} onClick={() => changePage(i)} style={{ backgroundColor: page === i ? '#313131' : '#212121' }}>
              {i + 1}
            </Button>
          ))}
        </div>
      </div>
    </Layout>
  )
}
