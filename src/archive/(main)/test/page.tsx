export default function page() {
  const categories: string[] = ['Electronics', "Men's Clothing", "Women's Clothing", 'Jewelery'];

  return (
    <div className="fixed flex items-center justify-center top-0 left-0 z-10 bg-black/10 h-screen w-screen">
      <div className="h-fit mx-auto min-w-xs max-w-xs sm:min-w-md sm:max-w-xl shadow-sm py-4 px-6 sm:px-10 bg-white rounded-xl">
        <div className="my-3">
          <h1 className="text-center text-2xl font-bold text-gray-900 dark:text-white">Create New Product</h1>
          <form action="" className="flex flex-col mt-2 gap-2
          [&_label]:text-sm [&_label]:font-semibold [&_label]:capitalize
          [&_input,textarea,select]:w-full [&_input,textarea,select]:border [&_input,textarea,select]:outline-black/60 [&_input,textarea,select]:px-2 [&_input,textarea,select]:py-2 [&_input,textarea,select]:text-sm [&_input,textarea,select]:rounded-md [&_input,textarea,select]:bg-white
          ">
            <div className="">
              <label htmlFor="code" className="">code</label>
              <input type="text" name="code" className="" id="code" />
            </div>

            <div className="">
              <label htmlFor="name">Product Name</label>
              <input type="text" name="name" id="name" />
            </div>

            <div className="flex gap-5 mt-2 items-center">
              <label htmlFor="category" className="">Category</label>

              <div className="relative flex-1">
                <select
                  name="category"
                  id="category"
                  className="appearance-none rounded-md px-4 py-2 pr-10 focus:outline-1 transition-all cursor-pointer"
                >
                  <option value=""></option>
                  {categories.map((cat, idx) => (
                    <option key={idx} value={cat}>{cat}</option>
                  ))}
                </select>

                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 text-black/80">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="">
              <label htmlFor="description">Description</label>
              <textarea rows={5} name="description" id="description" className="resize-none" />
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label htmlFor="price">price</label>
                <input type="number" min={0} name="price" id="price" className="no-spinner"/>
              </div>
              <div className="flex-1">
                <label htmlFor="quantity">quantity</label>
                <input type="number" min={0} name="quantity" id="quantity" className="no-spinner" />
              </div>
            </div>

            <div className="flex gap-4 mt-4
            [&_button]:mt-4 [&_button]:px-4 [&_button]:py-2 [&_button]:rounded-xl [&_button]:w-full
            ">
              <button className="bg-black/30 text-white text-sm sm:text-base">back</button>
              <button className="bg-black text-white text-sm sm:text-base">Save</button>
            </div>

          </form>
        </div>
      </div>
    </div>
  )
}