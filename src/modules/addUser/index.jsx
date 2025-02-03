import React, { useState, useEffect } from "react";;
import { toast } from "react-toastify";
import "assets/addTenantPage.css";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPlots,
  fetchRooms,
  fetchTenantDetails,
  saveTenant,
} from "./tenantSlice";

const initialState = {
  name: "",
  contact: "",
  roomNumber: "",
  plotNumber: "",
  depositPaid: 0,
  monthlyRent: 0,
  entryDate: "",
  aadharCard: null,
  photo: null,
  additionalDocuments: [],
};

const AddTenantForm = () => {
  const [formData, setFormData] = useState(initialState);
  const [aadharPreview, setAadharPreview] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [dynamicDocuments, setDynamicDocuments] = useState([]);
  console.log({ formData });
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { plots, rooms, tenantDetails, status, error, loading } = useSelector(
    (state) => state.tenant
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchTenantDetails(id));
    }
    dispatch(fetchPlots());
  }, [id, dispatch]);

  useEffect(() => {
    if (tenantDetails && id) {
      const tenant = tenantDetails.tenant || {};
      const room = tenantDetails.room || {};
      console.log({ tenant });
      setFormData({
        name: tenant.name || "",
        contact: tenant.contact || "",
        plotNumber:
          plots?.find((x) => x._id === room.plotNumber)?.plotNumber || "",
        roomNumber: room.roomNumber || "",
        depositPaid: tenant.depositPaid || 0,
        monthlyRent: tenant.monthlyRent || 0,
        entryDate: tenant.entryDate
          ? new Date(tenant.entryDate).toISOString().split("T")[0]
          : "",
        aadharCard: tenant.aadharCard || null,
        photo: tenant.photo || null,
        additionalDocuments: tenant.documents || [],
      });

      setDynamicDocuments(tenant.documents || []);
      setAadharPreview(tenant.aadharCard);
      setPhotoPreview(tenant.photo);
      if (room.plotNumber) {
        const plotid = plots?.find(
          (x) => x._id === room.plotNumber
        )?.plotNumber;
        dispatch(fetchRooms(plotid));
      }
    }
  }, [tenantDetails, id, dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === "plotNumber") {
      dispatch(fetchRooms(value));
    }
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];
    setFormData((prev) => ({ ...prev, [name]: file }));
    if (name === "aadharCard") {
      setAadharPreview(URL.createObjectURL(file));
    } else if (name === "photo") {
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const handleDynamicFileChange = (e, index) => {
    const updatedDocuments = [...dynamicDocuments];
    updatedDocuments[index] = e.target.files[0];
    setDynamicDocuments(updatedDocuments);
  };

  const addDynamicDocumentField = () => {
    setDynamicDocuments([...dynamicDocuments, null]);
  };

  const removeDynamicDocumentField = (index) => {
    const updatedDocuments = dynamicDocuments.filter((_, i) => i !== index);
    setDynamicDocuments(updatedDocuments);
  };

  const removePreview = (type) => {
    if (type === "aadharCard") {
      setAadharPreview(null);
      setFormData((prev) => ({ ...prev, aadharCard: null }));
    } else if (type === "photo") {
      setPhotoPreview(null);
      setFormData((prev) => ({ ...prev, photo: null }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (!["aadharCard", "photo", "additionalDocuments"].includes(key)) {
        form.append(key, value);
      }
    });

    if (formData.aadharCard) form.append("aadharCard", formData.aadharCard);
    if (formData.photo) form.append("photo", formData.photo);
    // dynamicDocuments.forEach((doc) => {
    //   form.append("documents", doc);
    // });
    // Append existing documents URLs (if any) + newly uploaded documents
    dynamicDocuments.forEach((doc) => {
      if (typeof doc === "string") {
        // If the document is already a URL (existing document)
        form.append("documents", doc);
      } else if (doc instanceof File) {
        // If the document is a new file (to be uploaded)
        form.append("documents", doc);
      }
    });

    dispatch(saveTenant({ id, formData: form }))
      .unwrap()
      .then(() => {
        toast.success(`Tenant ${id ? "updated" : "added"} successfully!`);
        navigate("/all-room");
      })
      .catch((err) => {
        toast.error(err || `Failed to ${id ? "update" : "add"} tenant.`);
      });
  };
  console.log({ dynamicDocuments });
  return (
    <div className="add-tenant-form addTenantPage">
      {/* <h1>{id ? "Update Tenant" : "Add Tenant"}</h1> */}
      <h2
        className="wow bounceIn titleDiv"
        data-wow-offset="50"
        data-wow-delay="0.3s"
      >
        <span className="title">{id ? "Update" : "Add"}</span> Tenant
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Contact</label>
          <input
            type="text"
            name="contact"
            value={formData.contact}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Plot</label>
          <select
            name="plotNumber"
            value={formData.plotNumber}
            onChange={handleInputChange}
            required
          >
            <option value="" disabled>
              Select a Plot
            </option>
            {plots.map((plot) => (
              <option key={plot._id} value={plot.plotNumber}>
                {plot.plotNumber} - {plot.area}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Room</label>
          <select
            name="roomNumber"
            value={formData.roomNumber}
            onChange={handleInputChange}
            required
          >
            <option value="" disabled>
              Select a Room
            </option>
            {rooms.map((room) => (
              <option key={room._id} value={room.roomNumber}>
                {room.roomNumber}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Deposit Paid</label>
          <input
            type="number"
            name="depositPaid"
            value={formData.depositPaid}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Monthly Rent</label>
          <input
            type="number"
            name="monthlyRent"
            value={formData.monthlyRent}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Entry Date</label>
          <input
            type="date"
            name="entryDate"
            value={formData.entryDate}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Aadhar Card</label>
          {aadharPreview ? (
            <div className="preview-container">
              {/* Use Cloudinary URL */}
              <img
                src={aadharPreview}
                alt="Aadhar Preview"
                className="preview-image-tenant"
              />
              <button type="button" onClick={() => removePreview("aadharCard")}>
                Remove
              </button>
            </div>
          ) : (
            <input
              type="file"
              name="aadharCard"
              onChange={handleFileChange}
              accept=".jpg,.jpeg,.png,.pdf"
            />
          )}
        </div>

        <div className="form-group">
          <label>Photo</label>
          {photoPreview ? (
            <div className="preview-container">
              {/* Use Cloudinary URL */}
              <img
                src={photoPreview}
                alt="Photo Preview"
                className="preview-image-tenant"
              />
              <button type="button" onClick={() => removePreview("photo")}>
                Remove
              </button>
            </div>
          ) : (
            <input
              type="file"
              name="photo"
              onChange={handleFileChange}
              accept=".jpg,.jpeg,.png"
            />
          )}
        </div>
        <div className="dynamic-documents">
          <h4>Additional Documents</h4>
          {dynamicDocuments?.map((file, index) => (
            <div key={index} className="dynamic-document-field">
              {typeof file === "string" ? (
                // Show the link or preview for already uploaded documents
                <div key={index} className="dynamic-document-field">
                  {typeof file === "string" ? (
                    // Display already uploaded document with a preview or download link
                    <div className="uploaded-document-preview">
                      <div className="document-info">
                        <span className="document-icon">📄</span>
                        <a
                          href={file}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="document-link"
                        >
                          Document {index + 1}
                        </a>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeDynamicDocumentField(index)}
                        className="remove-btn"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    // Input field for uploading a new document
                    <div className="new-document-upload">
                      <input
                        type="file"
                        onChange={(e) => handleDynamicFileChange(e, index)}
                        accept=".jpg,.jpeg,.png,.pdf"
                        className="upload-input"
                      />
                      <label className="upload-label">
                        Upload New Document
                      </label>
                    </div>
                  )}
                </div>
              ) : (
                // Input field for newly uploaded documents
                <input
                  type="file"
                  onChange={(e) => handleDynamicFileChange(e, index)}
                  accept=".jpg,.jpeg,.png,.pdf"
                />
              )}
            </div>
          ))}

          <button
            type="button"
            onClick={addDynamicDocumentField}
            className="add-btn"
          >
            + Add More Document
          </button>
        </div>
        <button type="submit" className="submit-btn" disabled={loading}>
          {id
            ? loading
              ? "Updating..."
              : "Update Tenant"
            : loading
            ? "Adding..."
            : "Add Tenant"}
        </button>
      </form>
    </div>
  );
};

export default AddTenantForm;
