import { useId } from 'react'
import './Filters.css'
import { useFilters } from '../hooks/useFilters'

export function Filters () {
  const {filters, setFilters} = useFilters()
  const minPriceFilterId = useId()
  const categoryFilterId = useId()
    
  const handleChangeMinPrice = (event) => {
    setFilters(prevState => ({
      ...prevState,
      price : event.target.value
    }))
  }

  const handleChangeCategory = (event) => {
    setFilters(prevState => ({
      ...prevState,
      category : event.target.value
    }))
  }

  return (
    <section className="filters">
      <div>
        <label htmlFor={minPriceFilterId}>Precio</label>
        <div className='range'>
          <input onChange={handleChangeMinPrice} type="range" id={minPriceFilterId} min='0' max='1000' value={filters.price}/>
          <span>${filters.price}</span>
        </div>
      </div>
      <div>
        <label htmlFor={categoryFilterId}>Categoria</label>
        <select name="" id={categoryFilterId} onChange={handleChangeCategory}>
          <option value="all">Todo</option>
          <option value="beauty">Belleza</option>
          <option value="fragrances">Fragancias</option>
          <option value="furniture">Muebles</option>
          <option value="groceries">Mercado</option>
        </select>
      </div>
    </section>
  )
}