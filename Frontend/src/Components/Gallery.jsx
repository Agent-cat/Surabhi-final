import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import poster1 from "../assets/2023.jpg";
import poster2 from "../assets/2024.jpg";
import poster3 from "../assets/2025.jpg";

const Gallery = () => {
  const [selectedYear, setSelectedYear] = useState("2024");
  const [selectedImage, setSelectedImage] = useState(null);
  const [photos2025, setPhotos2025] = useState([
    {
      caption: "Coming Soon Preview",
      description: "A glimpse into what's coming in 2025",
      image: poster1,
    },
    {
      caption: "Team Planning Session",
      description: "Behind the scenes of our planning",
      image: poster2,
    },
    {
      caption: "Getting Ready for 2025",
      description: "Preparations in full swing",
      image: poster3,
    },
  ]);

  const photos2024 = [
    {
      caption: "Grand Opening Ceremony",
      description: "The spectacular start of our event",
      image: poster1,
    },
    {
      caption: "Cultural Dance Show",
      description: "Celebrating diversity through dance",
      image: poster2,
    },
    {
      caption: "Robotics Workshop",
      description: "Hands-on technology learning",
      image: poster3,
    },
    {
      caption: "Coding Competition",
      description: "Young minds solving challenges",
      image: poster1,
    },
    {
      caption: "Prize Distribution",
      description: "Celebrating achievements",
      image: poster2,
    },
    {
      caption: "Enthusiastic Participants",
      description: "The energy of our community",
      image: poster3,
    },
    {
      caption: "Grand Opening Ceremony",
      description: "The spectacular start of our event",
      image: poster1,
    },
    {
      caption: "Cultural Dance Show",
      description: "Celebrating diversity through dance",
      image: poster2,
    },
    {
      caption: "Robotics Workshop",
      description: "Hands-on technology learning",
      image: poster3,
    },
    {
      caption: "Coding Competition",
      description: "Young minds solving challenges",
      image: poster1,
    },
    {
      caption: "Prize Distribution",
      description: "Celebrating achievements",
      image: poster2,
    },
    {
      caption: "Enthusiastic Participants",
      description: "The energy of our community",
      image: poster3,
    },
  ];

  const captions = [
    "Amazing Moment",
    "Special Memory",
    "Wonderful Time",
    "Great Experience",
    "Unforgettable Event",
    "Beautiful Capture",
  ];

  const descriptions = [
    "A magical moment captured in time",
    "Creating memories that last forever",
    "Sharing joy and happiness",
    "An incredible experience to remember",
    "Making history together",
    "Celebrating life's special moments",
  ];

  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    files.forEach((file) => {
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const randomCaption =
            captions[Math.floor(Math.random() * captions.length)];
          const randomDescription =
            descriptions[Math.floor(Math.random() * descriptions.length)];
          const newPhoto = {
            caption: randomCaption,
            description: randomDescription,
            image: e.target.result,
          };
          setPhotos2025((prev) => [...prev, newPhoto]);
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen bg-black py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-6xl md:text-4xl text-center font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent mb-7">
          Gallery
        </h1>

        <div className="flex justify-center gap-4 mb-12">
          {["2024", "2025"].map((year) => (
            <motion.button
              key={year}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedYear(year)}
              className={`px-8 py-3 rounded-lg text-xl font-medium transition-all duration-200 ${
                selectedYear === year
                  ? "bg-purple-600 text-white shadow-lg"
                  : "bg-gray-900 text-purple-300 hover:bg-gray-800 border border-purple-800"
              }`}
            >
              {year}
            </motion.button>
          ))}
        </div>

        {selectedYear === "2025" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 bg-gray-900 rounded-xl p-8 border border-purple-900"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            <div className="text-center">
              <p className="text-xl text-purple-300 mb-3">Share Your Moments</p>
              <p className="text-gray-400 mb-4">
                Drag and drop your content or
              </p>
              <label className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg cursor-pointer transition-colors duration-200">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (e) => {
                        const randomCaption =
                          captions[Math.floor(Math.random() * captions.length)];
                        const randomDescription =
                          descriptions[
                            Math.floor(Math.random() * descriptions.length)
                          ];
                        const newPhoto = {
                          caption: randomCaption,
                          description: randomDescription,
                          image: e.target.result,
                        };
                        setPhotos2025((prev) => [...prev, newPhoto]);
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  className="hidden"
                />
                Choose Files
              </label>
            </div>
          </motion.div>
        )}

        <div className="flex flex-col gap-8">
          {[0, 1, 2, 3].map((rowIndex) => {
            const items = (
              selectedYear === "2024" ? photos2024 : photos2025
            ).slice(rowIndex * 3, (rowIndex + 1) * 3);

            return (
              <div key={rowIndex} className="grid grid-cols-12 gap-6">
                {rowIndex % 2 === 0 ? (
                  <>
                    <motion.div
                      className="col-span-8 aspect-video bg-gradient-to-br from-purple-900/30 to-gray-900 rounded-2xl overflow-hidden relative group cursor-pointer"
                      whileHover={{ scale: 1.02 }}
                      onClick={() => setSelectedImage(items[0])}
                    >
                      {items[0]?.image && (
                        <img
                          src={items[0].image}
                          alt={items[0].caption}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-8 flex flex-col justify-end">
                        <h3 className="text-2xl font-bold text-purple-300">
                          {items[0]?.caption}
                        </h3>
                        <p className="text-gray-400 mt-2">
                          {items[0]?.description}
                        </p>
                      </div>
                    </motion.div>
                    <motion.div
                      className="col-span-4 aspect-square bg-gradient-to-br from-purple-900/30 to-gray-900 rounded-2xl overflow-hidden relative group cursor-pointer"
                      whileHover={{ scale: 1.02 }}
                      onClick={() => setSelectedImage(items[1])}
                    >
                      {items[1]?.image && (
                        <img
                          src={items[1].image}
                          alt={items[1].caption}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-6 flex flex-col justify-end">
                        <h3 className="text-xl font-bold text-purple-300">
                          {items[1]?.caption}
                        </h3>
                        <p className="text-gray-400 mt-2">
                          {items[1]?.description}
                        </p>
                      </div>
                    </motion.div>
                  </>
                ) : (
                  <>
                    <motion.div
                      className="col-span-4 aspect-square bg-gradient-to-br from-purple-900/30 to-gray-900 rounded-2xl overflow-hidden relative group cursor-pointer"
                      whileHover={{ scale: 1.02 }}
                      onClick={() => setSelectedImage(items[0])}
                    >
                      {items[0]?.image && (
                        <img
                          src={items[0].image}
                          alt={items[0].caption}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-6 flex flex-col justify-end">
                        <h3 className="text-xl font-bold text-purple-300">
                          {items[0]?.caption}
                        </h3>
                        <p className="text-gray-400 mt-2">
                          {items[0]?.description}
                        </p>
                      </div>
                    </motion.div>
                    <motion.div
                      className="col-span-8 aspect-video bg-gradient-to-br from-purple-900/30 to-gray-900 rounded-2xl overflow-hidden relative group cursor-pointer"
                      whileHover={{ scale: 1.02 }}
                      onClick={() => setSelectedImage(items[1])}
                    >
                      {items[1]?.image && (
                        <img
                          src={items[1].image}
                          alt={items[1].caption}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-8 flex flex-col justify-end">
                        <h3 className="text-2xl font-bold text-purple-300">
                          {items[1]?.caption}
                        </h3>
                        <p className="text-gray-400 mt-2">
                          {items[1]?.description}
                        </p>
                      </div>
                    </motion.div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-w-6xl  w-full max-h-[80vh]  rounded-2xl overflow-hidden"
            >
              <img
                src={selectedImage.image}
                alt={selectedImage.caption}
                className="w-full h-full object-contain"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 via-black/50 to-transparent">
                <h3 className="text-2xl font-bold text-purple-300">
                  {selectedImage.caption}
                </h3>
                <p className="text-gray-400 mt-2">
                  {selectedImage.description}
                </p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImage(null);
                }}
                className="absolute top-4 right-4 text-white hover:text-purple-400 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;
