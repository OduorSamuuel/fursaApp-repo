import React, { useState } from 'react';

function ServicesLeft({ children }) {
  const [colorVisible, setColorVisible] = useState(true);

  return (
    <>
      <div className=' hidden float-left w-64 bg-slate-500 border-4 sticky top-20 m-2 md:hidden sm:hidden lg:block'>
      <h3 className=" text-center text-yellow-200  text-xl">Filter Categories</h3>
        <form className="hidden lg:block">
        
          <ul role="list" className="space-y-4 border-b  border-gray-200 pb-6 text-sm font-medium text-gray-900">
            <li className='text-white'>
              <a href="#">All</a>
            </li>
            <li className='text-white'>
              <a href="#">Hairdressing</a>
            </li>
            <li className='text-white'>
              <a href="#">Make up artist</a>
            </li>
            <li className='text-white'>
              <a href="#">Repair man</a>
            </li>
           
           
          </ul>

          <div className="border-b border-gray-200 py-6">
            <h3 className="-my-3 flow-root">
              <button
                type="button"
                className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500"
                aria-controls="filter-section-0"
                aria-expanded={colorVisible}
                onClick={() => setColorVisible(colorVisible)}
              >
                <span className="font-medium text-gray-900">Color</span>
                <span className="ml-6 flex items-center">
                  <svg className={`h-5 w-5 ${colorVisible ? 'transform rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                  </svg>
                </span>
              </button>
            </h3>

            {colorVisible && (
              <div className="pt-6" id="filter-section-0">
                <div className="space-y-4">
                  <div className="flex items-center">
                    <input id="filter-color-0" name="color[]" value="white" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"/>
                    <label htmlFor="filter-color-0" className="ml-3 text-sm text-gray-600">White</label>
                  </div>
                  <div className="flex items-center">
                    <input id="filter-color-1" name="color[]" value="beige" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"/>
                    <label htmlFor="filter-color-1" className="ml-3 text-sm text-gray-600">Beige</label>
                  </div>
                  <div className="flex items-center">
                    <input id="filter-color-2" name="color[]" value="blue" type="checkbox" checked className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"/>
                    <label htmlFor="filter-color-2" className="ml-3 text-sm text-gray-600">Blue</label>
                  </div>
                  <div className="flex items-center">
                    <input id="filter-color-3" name="color[]" value="brown" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"/>
                    <label htmlFor="filter-color-3" className="ml-3 text-sm text-gray-600">Brown</label>
                  </div>
                  <div className="flex items-center">
                    <input id="filter-color-4" name="color[]" value="green" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"/>
                    <label htmlFor="filter-color-4" className="ml-3 text-sm text-gray-600">Green</label>
                  </div>
                  <div className="flex items-center">
                    <input id="filter-color-5" name="color[]" value="purple" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"/>
                    <label htmlFor="filter-color-5" className="ml-3 text-sm text-gray-600">Purple</label>
                  </div>
                </div>
              </div>
            )}
          </div>

       
        </form>
      </div>
      <div >{children}</div>
    </>
  );
}

export default ServicesLeft;