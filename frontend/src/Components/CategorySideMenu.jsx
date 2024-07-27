import React, { useEffect, useState } from 'react'
import { ListGroup, ListGroupItem } from 'reactstrap'
import { loadAllCategories } from '../services/category-service'
import { Link } from 'react-router-dom'

function CategorySideMenu() {

  const [categories, setCategories] = useState([]) 
  useEffect(() => {
    loadAllCategories().then(data => {
        setCategories([...data])
    }).catch(error => {
        console.log(error)
    })
  }, []) 
  return (
    <div>
        <ListGroup>
            <ListGroupItem action={true} className='border-0' tag={Link} to="/">
                All Blogs
            </ListGroupItem>
            {categories && categories.map((cat, index) => {
                return (
                    <ListGroupItem key={index} action={true} className='border-0 shadow-0 mt-1' tag={Link} to={"/categories/" + cat.categoryId}>
                        {cat.categoryTitle}
                    </ListGroupItem>
                )
            })}
        </ListGroup>
    </div>
  )
}

export default CategorySideMenu
