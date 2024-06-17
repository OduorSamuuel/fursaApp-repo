import React, { useState, useEffect } from 'react';
import { usePage, useForm } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import SidebarLayout from '@/Layouts/Admin/SidebarLayout';
import TopBar from '@/Layouts/Admin/TopBar';
import { toast } from 'react-hot-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faSave, faSpinner, faTimes } from '@fortawesome/free-solid-svg-icons';
import Card from '../../../Components/Card';

function Services() {
    const { provider, countyName, counties, serviceDetails, pricingTiers } = usePage().props;
    const [isEditing, setIsEditing] = useState(false);
    const [isEditingAdditional, setIsEditingAdditional] = useState(false);
    const [previews, setPreviews] = useState([null, null, null]);
    const [serviceName, setServiceName] = useState('');

    const { data, setData, put, processing, errors, progress } = useForm({
        company_name: provider?.company_name || '',
        service_type: provider?.service_type || '',
        contact_number: provider?.contact_number || '',
        address: provider?.address || '',
        county_id: provider?.county_id || '',
        service_image: null,
        service_description: serviceDetails?.service_description || '',
        availability: serviceDetails?.availability || '',
        images: [],
        pricing_tiers: pricingTiers && pricingTiers.length ? pricingTiers : [
            { name: 'Basic', price: '', description: '' },
            { name: 'Standard', price: '', description: '' },
            { name: 'Premium', price: '', description: '' },
        ],
    });

    useEffect(() => {
        if (pricingTiers) {
            setData('pricing_tiers', pricingTiers);
        }
    }, [pricingTiers]);

    const handleEdit = () => {
        if (isEditing) {
            put(route('admin.services.update', provider.id), {
                preserveScroll: true,
                onSuccess: () => {
                    toast.success('Service details updated successfully.');
                    setIsEditing(false);
                },
                onError: () => {
                    toast.error('Failed to update service details.');
                },
            });
        } else {
            setIsEditing(true);
        }
    };

    const handleEditAdditional = () => {
        if (isEditingAdditional) {
            const formData = new FormData();
            formData.append('availability', data.availability);
            data.pricing_tiers.forEach((tier, index) => {
                formData.append(`pricing_tiers[${index}][name]`, tier.name);
                formData.append(`pricing_tiers[${index}][price]`, tier.price);
                formData.append(`pricing_tiers[${index}][description]`, tier.description);
            });
            formData.append('service_description', data.service_description);
            data.images.forEach((file, index) => {
                formData.append(`image_${index + 1}`, file);
            });

            Inertia.post(route('admin.services.updateadditional', provider.id), formData)
                .then(() => {
                    toast.success('Additional details updated successfully.');
                    setIsEditingAdditional(false);
                    setData('images', []);
                    setPreviews([null, null, null]);
                })
                .catch((error) => {
                    console.error('Failed to update additional details:', error);
                    toast.error('Failed to update additional details.');
                });
        } else {
            setIsEditingAdditional(true);
        }
    };

    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        const newPreviews = [...previews];

        if (files.length > 3 || newPreviews.filter(preview => preview !== null).length + files.length > 3) {
            alert('You can only upload a maximum of 3 images.');
            return;
        }

        const updatedFiles = [...data.images];
        files.forEach((file, index) => {
            const previewIndex = newPreviews.findIndex(preview => preview === null);
            if (previewIndex !== -1) {
                newPreviews[previewIndex] = URL.createObjectURL(file);
                updatedFiles.push(file);
            }
        });

        setData('images', updatedFiles);
        setPreviews(newPreviews);
    };

    const handleRemoveImage = (index) => {
        const newPreviews = [...previews];
        const updatedFiles = [...data.images];

        newPreviews[index] = null;
        updatedFiles.splice(index, 1);

        setData('images', updatedFiles);
        setPreviews(newPreviews);
    };

    return (
        <TopBar>
            <SidebarLayout>
                <div className="max-w-4xl mx-auto p-8 bg-white shadow-md rounded-lg">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-800">Your Service</h2>
                        <button
                            onClick={handleEdit}
                            className={`px-4 py-2 rounded-md flex items-center ${
                                isEditing ? 'bg-green-500 text-white' : 'bg-blue-500 text-white'
                            }`}
                            disabled={processing}
                        >
                            <FontAwesomeIcon icon={isEditing ? faSave : faEdit} className="mr-2" />
                            {isEditing ? 'Save' : 'Edit'}
                        </button>
                    </div>
                    {processing && (
                        <div className="flex justify-center items-center">
                            <FontAwesomeIcon icon={faSpinner} spin className="text-blue-500" />
                        </div>
                    )}
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                           
                            <Card title="Company Name">
                                <p className="text-gray-700">{provider.company_name}</p>
                                {isEditing && (
                                    <input
                                        type="text"
                                        name="company_name"
                                        value={data.company_name}
                                        onChange={handleChange}
                                        className="w-full border rounded-md px-4 py-2 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                )}
                            </Card>
                            <Card title="Service Type">
                                <p className="text-gray-700">{provider.service_type}</p>
                                {isEditing && (
                                    <input
                                        type="text"
                                        name="service_type"
                                        value={data.service_type}
                                        onChange={handleChange}
                                        className="w-full border rounded-md px-4 py-2 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                )}
                            </Card>
                            <Card title="Contact Number">
                                <p className="text-gray-700">{provider.contact_number}</p>
                                {isEditing && (
                                    <input
                                        type="text"
                                        name="contact_number"
                                        value={data.contact_number}
                                        onChange={handleChange}
                                        className="w-full border rounded-md px-4 py-2 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                )}
                            </Card>
                            <Card title="Address">
                                <p className="text-gray-700">{provider.address}</p>
                                {isEditing && (
                                    <input
                                        type="text"
                                        name="address"
                                        value={data.address}
                                        onChange={handleChange}
                                        className="w-full border rounded-md px-4 py-2 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                )}
                            </Card>
                            <Card title="Service Image">
                                {}
                                {isEditing && (
                                    <input
                                        type="file"
                                        name="service_image"
                                        onChange={handleFileChange}
                                        className="w-full border rounded-md px-4 py-2 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                )}
                            </Card>
                            <Card title="County">
                                <p className="text-gray-700">{countyName}</p>
                                {isEditing && (
                                    <select
                                        name="county_id"
                                        value={data.county_id}
                                        onChange={handleChange}
                                        className="w-full border rounded-md px-4 py-2 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        {counties.map((county) => (
                                            <option key={county.id} value={county.id}>
                                                {county.name}
                                            </option>
                                        ))}
                                    </select>
                                )}
                            </Card>
                        </div>
                        <Card>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Additional Details</h2>
                <button
                            onClick={handleEditAdditional}
                            className={`px-4 py-2 rounded-md flex items-center ${
                                isEditingAdditional ? 'bg-green-500 text-white' : 'bg-blue-500 text-white'
                            }`}
                            disabled={processing}
                        >
                            <FontAwesomeIcon icon={isEditingAdditional ? faSave : faEdit} className="mr-2" />
                            {isEditingAdditional ? 'Save' : 'Edit'}
                        </button>

            </div>
            <form onSubmit={(e) => e.preventDefault()} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-3">
                <Card title="Availability">
                    <p className="text-gray-700">{serviceDetails ? serviceDetails.availability : ''}</p>
                    {isEditingAdditional && (
                        <input
                            type="text"
                            name="availability"
                            value={data.availability}
                            onChange={(e) => setData('availability', e.target.value)}
                            className="w-full border rounded-md px-4 py-2 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    )}
                </Card>
               
                <Card title="Description">
                    <p className="text-gray-700">{serviceDetails ? serviceDetails.service_description : ''}</p>
                    {isEditingAdditional && (
                        <textarea
                            name="service_description"
                            value={data.service_description}
                            onChange={(e) => setData('service_description', e.target.value)}
                            className="w-full border rounded-md px-4 py-2 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    )}
                </Card>
               
            </form>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-3">
                <Card title="Upload Images (Max 3)">
                    <div className="flex flex-col">
                        <div className="relative">
                            <input
                                type="file"
                                multiple
                                accept="image/*"
                                onChange={handleFileChange}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                            <button
                                type="button"
                                className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-700 focus:outline-none"
                            >
                                Browse
                            </button>
                        </div>
                        {errors.images && <div className="text-red-500 mt-2">{errors.images}</div>}
                    </div>
                    <div className="flex space-x-4 mt-4">
                        {previews.map((preview, index) => (
                            <div
                                key={index}
                                className="relative w-32 h-32 border rounded overflow-hidden bg-gray-200 flex items-center justify-center"
                            >
                                {preview ? (
                                    <>
                                        <img
                                            src={preview}
                                            alt={`Preview ${index + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveImage(index)}
                                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-700 focus:outline-none"
                                        >
                                            <FontAwesomeIcon icon={faTimes} />
                                        </button>
                                    </>
                                ) : (
                                    <span className="text-gray-500">Image {index + 1}</span>
                                )}
                            </div>
                        ))}
                    </div>
                    {progress && (
                        <div className="mt-4">
                            <progress value={progress.percentage} max="100" className="w-full">
                                {progress.percentage}%

                            </progress>
                    </div>
                )}
            </Card>
        </div>
        <Card title="Pricing Tiers">
    {['Basic', 'Standard', 'Premium'].map((tierName, index) => (
        <div key={index} className="mb-4">
            <h3 className="text-lg font-semibold text-gray-800">{tierName}</h3>
            <p className="text-gray-700">{data.pricing_tiers[index]?.price || 'No price available'}</p>
            <p className="text-gray-700">{data.pricing_tiers[index]?.description || 'No description available'}</p>
            {isEditingAdditional && (
                <div className="mt-2 space-y-2">
                    <input
                        type="text"
                        name={`pricing_tiers[${index}].price`}
                        placeholder="Price"
                        value={data.pricing_tiers[index]?.price || ''}
                        onChange={(e) => {
                            const newTiers = [...data.pricing_tiers];
                            if (!newTiers[index]) {
                                newTiers[index] = { name: tierName, price: '', description: '' };
                            }
                            newTiers[index].price = e.target.value;
                            setData('pricing_tiers', newTiers);
                        }}
                        className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <textarea
                        name={`pricing_tiers[${index}].description`}
                        placeholder="Description"
                        value={data.pricing_tiers[index]?.description || ''}
                        onChange={(e) => {
                            const newTiers = [...data.pricing_tiers];
                            if (!newTiers[index]) {
                                newTiers[index] = { name: tierName, price: '', description: '' };
                            }
                            newTiers[index].description = e.target.value;
                            setData('pricing_tiers', newTiers);
                        }}
                        className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            )}
        </div>
    ))}
</Card>

    </Card>

                        
                       
                     
                    </div>
                
                                  
                </div>

            </SidebarLayout>
        </TopBar>
    );
}

export default Services;
