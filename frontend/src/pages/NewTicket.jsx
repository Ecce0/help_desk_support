import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { createNewTicket, reset} from '../features/tickets/ticketSlice'
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'


const NewTicket = () => {
  const { user } = useSelector(state => state.auth)
  const { isLoading, isError, isSuccess, message} = useSelector(state => state.tickets)
  const [ name] = useState(user.name)
  const [ email ] = useState(user.email)
  const [ product, setProduct ] = useState('iPhone')
  const [ description, setDescription ] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

 useEffect(() => {
  if(isError){
    toast.error(message)
  } 
  
  if(isSuccess) {
    dispatch(reset, navigate('/tickets'))
  }
  

  dispatch(reset)
 },[dispatch, isError, isSuccess, message, navigate])

  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(createNewTicket({product, description}))
  }

  if(isLoading) {
    return <Spinner />
  }

  return(
    <>
    <BackButton url='/' />
    <section className="heading">
      <h1>Create New Ticket</h1>
      <p>Please fill out form below</p>

    </section>

    <section className='form'>
      <div className="form-group">
        <label htmlFor="name">Customer Name</label>
        <input type="text" className="form-control" value={name} disabled/>
      </div>
      <div className="form-group">
        <label htmlFor="name">Customer Email</label>
        <input type="email" className="form-control" value={email} disabled/>
      </div>
      <form onSubmit={onSubmit}>
        <div className="form-group">
        <label htmlFor="product">Product</label>
        <select name="product" id="product" value={product} onChange={(e) => setProduct(e.target.value)}>
          <option value="iPhone">iPhone</option>
          <option value="MacBook">MacBook</option>
          <option value="iPad">iPad</option>
          <option value="iMac">iMac</option>
          <option value="Android">Android</option>
          <option value="Samsung Galaxy">Samsung Galaxy</option>
          <option value="LG">LG</option>
          <option value="Google Pixel">Google Pixel</option>
        </select>
        </div>
        <div className="form-group">
          <label htmlFor="description">What's the issue?</label>
          <textarea name="description" id="description" className='form-control' placeholder='Description of the issue' value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
        </div>
        <div className="form-group">
          <button className="btn btn-block">Submit</button>
        </div>
      </form>
    </section>
    </>
  )
};

export default NewTicket;
