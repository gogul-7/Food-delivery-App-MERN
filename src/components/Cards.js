import React, { useEffect, useRef, useState } from 'react'
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useDispatchCart, useCart } from '../store/ContextReducer';
import './Cards.css'

function Cards({item}) {

  let option=item.options[0];
  let priceOption = Object.keys(option)
  let data=useCart()
  let priceRef=useRef()

  const [qty,setQty]=useState(1)
  const [size,setSize]=useState('')


  

  let dispatch=useDispatchCart();
  const handleAddCart = async ()=>{
    let food = []
    for(const res of data){
      if(res.id === item._id){
        food = res
        break
      }
    }
    if(food !== []){
      if(food.size === size){
        await dispatch({ type:"UPDATE",id:item._id, price:finalPrice,qty:qty})
        return
      }
      else if(food.size !== size){
        await dispatch({type:"ADD",id:item._id,name:item.name,price:finalPrice,qty:qty,size:size,img:item.img})
        return
      }
      return
    }
    await dispatch({type:"ADD",id:item._id,name:item.name,price:finalPrice,qty:qty,size:size,img:item.img})
  }
  let finalPrice = qty * parseInt(option[size])

  useEffect(()=>{
    setSize(priceRef.current.value)
  })
  return (
    <div>
        <Container>
          <Card style={{ width: '18rem',minHeight:'16rem', marginTop: '20px', marginBottom:'20px',padding:'5px' }}>
            <Card.Img style={{ maxHeight:'9rem'}} variant="top" src={item.img} />
            <Card.Body>
              <Card.Title>{item.name}</Card.Title>
              <div className='d-flex '>
                <select className='selectDes' size="sm" onChange={(e)=>setQty(e.target.value)}>
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                </select>
                <select className='selectDes2' ref={priceRef} size="sm" onChange={(e)=>setSize(e.target.value)}>
                  {
                    priceOption.map((res)=>{
                      return <option key={res} value={res}>{res}</option>
                    })
                  }
                </select>
                <Card.Text className='priceDes'>
                Total: ₹{finalPrice}/- 
              </Card.Text>
              </div>
            </Card.Body>
            <Button onClick={handleAddCart} className='' variant="primary">Add to cart</Button>
          </Card>
        </Container>
      </div>
  )
}

export default Cards