import React, { useContext, useEffect, useState } from 'react'
import Base from '../../Components/Base'
import UserContext from '../../context/UserContext'
import { useParams } from 'react-router-dom'
import { getUser } from '../../services/user-service'
import { Row, Col, Card, CardBody, Container, Table} from 'reactstrap'
import ViewUserProfile from '../../Components/ViewUserProfile'

const ProfileInfo = () => {

  const object = useContext(UserContext)
  const {userId} = useParams()
  const [user, setUser] = useState(null)

  useEffect(() => {
    getUser(userId).then(data => {
      setUser({...data})
    })

  }, [])

  const userView = () => {
    return (
      <Row>
        <Col md={{size: 8, offset: 2}}>
          <ViewUserProfile user={user}></ViewUserProfile>
        </Col>
      </Row>
    )
  }

  return (
    <Base>
      {user ? userView() : 'Loading user data...'}
    </Base>
  )
}

export default ProfileInfo
