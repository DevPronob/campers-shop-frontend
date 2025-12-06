import { TCategory } from '@/types/CategoryTypes';

function CategoryCard({ item }: { item: TCategory }) {
    return (
        <div className="p-1 flex flex-wrap items-center justify-center rounded-3xl overflow-hidden">
            <div
                style={{
                    backgroundImage: `url(${item?.imageUrl})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: '300px'
                }}
                className="flex-shrink-0 m-6 relative overflow-hidden rounded-lg w-[270px] shadow-lg group"
            >
                <div className="relative pt-10 px-10 flex items-center justify-center group-hover:scale-110 transition-transform">
                </div>
                <div className=" text-white px-6 pb-6 mt-12 h-full flex flex-col items-start gap-1.5 absolute top-[139px]">
                    <span className="block  mb-2">{item.name}</span>
                    <div className="flex justify-between">
                        <button
                            type="button"
                            className="py-2 px-4 bg-[#ffffff] border border-[#21b3f1] text-black w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-[#21b3f1] focus:ring-offset-2 focus:ring-offset-indigo-200 hover:bg-[#21b3f1] hover:text-white rounded-lg"
                        >
                            Shop Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CategoryCard;
