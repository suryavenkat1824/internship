
import React, { useState } from 'react';

const Templates = () => {
  const [title, setTitle] = useState('');
  const [speakers, setSpeakers] = useState(['']);
  const [banner, setBanner] = useState(null);
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);

  const handleInputChange = (event, index) => {
    const { name, value } = event.target;
    if (name === 'title') {
      setTitle(value);
    } else if (name === 'speaker') {
      const updatedSpeakers = [...speakers];
      updatedSpeakers[index] = value;
      setSpeakers(updatedSpeakers);
    } else if (name === 'description') {
      setDescription(value);
    }
  };

  const handleImageChange = (event) => {
    const files = event.target.files;
    const imageUrls = [];
    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      reader.onload = () => {
        imageUrls.push(reader.result);
        if (imageUrls.length === files.length) {
          setImages(imageUrls);
        }
      };
      reader.readAsDataURL(files[i]);
    }
  };

  const handleAddFile = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImages([...images, reader.result]);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveFile = (index) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
  };

  const handleAddSpeaker = () => {
    setSpeakers([...speakers, '']);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform form submission or further processing here
    console.log({
      title,
      speakers,
      banner,
      description,
      images,
    });
  };

  return (
    <div className="container mx-auto py-8">
      <form onSubmit={handleSubmit} className="max-w-full">
        <div className="mb-4">
          <label htmlFor="title" className="font-bold mb-2">
            <strong>1. Conference Title:</strong>
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={handleInputChange}
            className="border border-gray-300 rounded px-3 py-2 bg-biscuit ml-2"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="speakers" className="font-bold mb-2">
            <strong>2. Speakers:</strong>
          </label>
          {speakers.map((speaker, index) => (
            <div key={index} className="flex mb-2">
              <label htmlFor={`speaker${index + 1}`} className="mr-2">
                {`Speaker ${index + 1}:`}
              </label>
              <input
                type="text"
                id={`speaker${index + 1}`}
                name="speaker"
                value={speaker}
                onChange={(event) => handleInputChange(event, index)}
                className="border border-gray-300 rounded px-3 py-2 bg-biscuit"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddSpeaker}
            className="bg-blue-500 hover:bg-blue-700 text-white font
-bold py-2 px-4 rounded ml-2"
>
Add Speaker
</button>
</div>
    <div className="mb-4">
      <label htmlFor="banner" className="font-bold mb-2">
        <strong>3. Banner Image:</strong>
      </label>
      <br />
      <input
        type="file"
        id="banner"
        name="banner"
        onChange={handleImageChange}
      />
      {banner && (
        <img
          src={banner}
          alt="Banner"
          className="w-32 h-32 object-cover rounded-md mr-2 mb-2"
        />
      )}
    </div>

    <div className="mb-4">
      <label htmlFor="description" className="font-bold mb-2">
        <strong>4. Description:</strong>
      </label>
      <textarea
        id="description"
        name="description"
        value={description}
        onChange={handleInputChange}
        className="border border-gray-300 rounded px-3 py-2 bg-biscuit"
        required
      ></textarea>
    </div>

    <div className="mb-4">
      <label htmlFor="images" className="font-bold mb-2">
        <strong>5. Images:</strong>
      </label>
      <div>
        <input
          type="file"
          id="images"
          name="images"
          onChange={handleAddFile}
        />
        {images.map((image, index) => (
          <div key={index} className="relative">
            <img
              src={image}
              alt={`Image ${index + 1}`}
              className="w-32 h-32 object-cover rounded-md mr-2 mb-2"
            />
            <button
              type="button"
              className="absolute top-0 right-0 text-red-500"
              onClick={() => handleRemoveFile(index)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>

    <div className="mt-6">
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Submit
      </button>
    </div>
  </form>
</div>
);
};

export default Templates;