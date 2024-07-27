import React, { useEffect, useState } from 'react'
import { Button, Card, CardBody, CardFooter, Container, Table} from 'reactstrap'
import { getCurrentUserDetails, isLoggedIn } from '../Auth'

const ViewUserProfile = ({user}) => {

    const [currentUser, setCurrentUser] = useState(null)
    const [login, setLogin] = useState(false)
    useEffect(()=>{
        setCurrentUser(getCurrentUserDetails())
        setLogin(isLoggedIn())
    },[])
  return (
    <Card>
            <CardBody>
              <h3 className='text-uppercase'>User Information</h3>
              <Container className='text-center'>
                <img style={{maxWidth: '250px', maxHeight:'250px'}} src="https://images.app.goo.gl/GVXgwD6Sk914cNZLA" alt="user profile picture" className="img-fluid"></img>
              </Container>
              <Table responsive striped className='mt-5'>
                <tbody>
                  <tr>
                    <td>
                      User ID
                    </td>
                    <td>
                      {user.id}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      Username
                    </td>
                    <td>
                      {user.name}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      User Email
                    </td>
                    <td>
                      {user.email}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      About
                    </td>
                    <td>
                      {user.about}
                    </td>
                  </tr>
                </tbody>
              </Table>
              {currentUser ? (
                <CardFooter className='text-center'>
                <Button color='warning'>Update Profile</Button>
              </CardFooter>
              ) : ''}
            </CardBody>
          </Card>
  )
}

export default ViewUserProfile
