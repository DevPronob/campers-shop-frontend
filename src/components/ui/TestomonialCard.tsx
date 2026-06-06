


function TestomonialCard({ item }: { item: any }) {
    return (
        <div>
            <div className="flex flex-col rounded-xl py-4  text-center ">
                <div className="flex flex-1 flex-col justify-between p-6 lg:py-7 lg:px-5">
                    <div className="flex-1">
                        <p className="border-[#21b3f1] px-10 text-xl font-black">{item.title}</p>

                        <blockquote className="mt-8 flex-1">
                            <p className="leading-relaxed  text-[15px]">{item.description}</p>
                        </blockquote>
                    </div>

                    <div className="-mx-5 mt-8 px-8 py-1">
                        <div className="">
                            <p className="text-base font-bold">{item.name}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TestomonialCard