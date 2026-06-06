
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from './ui/sheet';
import { useGetCartQuery } from '@/redux/api/features/cart/cartApi';

import toast from 'react-hot-toast';

function CartSheet() {
    const { data, error, isLoading } = useGetCartQuery(undefined);
    console.log(data, "data cart")

    if (isLoading) {
        return <div role="status">
            <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
            </svg>
            <span className="sr-only">Loading...</span>
        </div>
    }
    if (error) {
        toast.error("Failed to fetch data")
    }
    return (
        <div >
            <Sheet>
                <SheetTrigger>
                    <button className="relative p-2 m-[-4px]">
                        
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                        </svg>

                    </button>
                </SheetTrigger>
                <SheetContent side="right">
                    <SheetHeader>
                        <SheetTitle>Shopping cart</SheetTitle>
                        <SheetDescription>Your selected items</SheetDescription>
                    </SheetHeader>
                    <div className="mt-8">
                        <div className="flow-root px-4 h-[200px] overflow-y-scroll">
                            <ul role="list" className="-my-6 divide-y divide-gray-200">
                                {
                                    data?.data.map((items:any) => {
                                        return < div className="flex py-6" >
                                            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                <img
                                                    src={items?.productId?.imageUrls?.[0] || '/placeholder.svg'}
                                                    onError={(e) => {
                                                        (e.target as HTMLImageElement).src = '/placeholder.svg';
                                                    }}
                                                    alt={items?.productId?.name || 'Product Image'}
                                                    className="h-full w-full object-cover object-center"
                                                />
                                            </div>
                                            <div className="ml-4 flex flex-1 flex-col">
                                                <div>
                                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                                        <h3>
                                                            <a href="#">{items?.productId.name}</a>
                                                        </h3>
                                                        <p className="ml-4">{items?.productId.price}</p>
                                                    </div>
                                                    
                                                </div>
                                                <div className="flex flex-1 items-end justify-between text-sm">
                                                    <p className="text-gray-500">{`Qty ${items?.quantity}`}</p>
                                                    <div className="flex">
                                                        <button type="button" className="font-medium text-[#21b3f1] hover:text-[#21b3f1]">Remove</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    })
                                }

                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                        
                        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                            <p>
                                

                                <button type="button"
                                    className="py-2 w-[185px] px-4 bg-[#21b3f1] border border-[#21b3f1] text-white  transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-[#21b3f1] focus:ring-offset-2 focus:ring-offset-indigo-200 hover:bg-[#21b3f1] hover:text-white rounded-lg">Go to Cart</button>
                            </p>
                        </div>
                    </div>
                </SheetContent>
            </Sheet >
        </div>
    );
}

export default CartSheet;



