import ProductForm from './ProductForm'

export default function App() {

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow p-4">
            <h1 className="text-center mb-4">Product Form</h1>
            <ProductForm />
          </div>
        </div>
      </div>
    </div>
  )
}

