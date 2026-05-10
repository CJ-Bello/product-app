import { useRef, useState, type ChangeEvent, type FormEvent } from 'react'
import type { FormData } from './FormData'

export default function ProductForm() {
  const [formData, setFormData] = useState<FormData>({
    code: '',
    description: '',
    unitPrice: '',
    isActive: false,
  })

  const [savedData, setSavedData] = useState<FormData | null>(null)
  const unitPriceRef = useRef<HTMLInputElement>(null)
  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type } = event.target

    setFormData({
      ...formData,
      [name]:
        type === 'checkbox'
          ? (event.target as HTMLInputElement).checked
          : value,
    })
  }
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const submittedData: FormData = {
      ...formData,
      unitPrice: unitPriceRef.current?.value || '',
    }

    setSavedData(submittedData)

    setFormData({
      code: '',
      description: '',
      unitPrice: '',
      isActive: false,
    })

    if (unitPriceRef.current) {
      unitPriceRef.current.value = ''
    }
  }
  return (
    <>
      <h4 className="text-center mb-4 text-primary">
        Product info is{' '}
        {savedData ? 'saved!' : 'not yet saved'}
      </h4>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label fw-bold">Code</label>

          <input
            type="text"
            name="code"
            className="form-control"
            value={formData.code}
            onChange={handleChange}
            maxLength={10}
            required
          />

          <small className="text-muted">
            Required | maxLength = 10
          </small>
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold">Description</label>

          <textarea
            name="description"
            className="form-control"
            rows={4}
            value={formData.description}
            onChange={handleChange}
            maxLength={200}
            required
          />

          <small className="text-muted">
            Required | maxLength = 200
          </small>
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold">Unit Price</label>

          <input
            type="number"
            name="unitPrice"
            className="form-control"
            step="0.01"
            ref={unitPriceRef}
          />

          <small className="text-muted">
            Input type = number | not required
          </small>

        <div className="form-check mb-4">
          <input
            type="checkbox"
            name="isActive"
            className="form-check-input"
            checked={formData.isActive}
            onChange={handleChange}
          />

          <label className="form-check-label fw-bold">
            Is Active
          </label>
        </div>
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Submit
        </button>
      </form>

      {savedData && (
        <div className="card shadow mt-4 p-4">
          <h3 className="mb-3">Environment</h3>

          <p className="text-success fw-bold">
            Product info is saved!
          </p>

          <h5>Product Details:</h5>

          <p>
            <strong>Code:</strong> {savedData.code}
          </p>

          <p>
            <strong>Description:</strong>{' '}
            {savedData.description}
          </p>

          <p>
            <strong>Unit Price:</strong>{' '}
            {savedData.unitPrice || 'N/A'}
          </p>

          <p>
            <strong>Is Active:</strong>{' '}
            {savedData.isActive ? 'true' : 'false'}
          </p>
        </div>
      )}
    </>
  )
}