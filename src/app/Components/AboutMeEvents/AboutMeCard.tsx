export default function AboutMeCard({type, title,text,place,link,linkName,img}: any){

    return(
        <div className=" max-w-sm bg-white shadow-lg rounded-lg overflow-hidden my-4">
                                    <img
                                        className="w-full h-72 object-cover object-center"
                                        src={img}
                                        alt="avatar"
                                        title="avatar"
                                    ></img>
                                    <div className="flex items-center px-6 py-3 bg-blue-400">
                                        <h2 className="mx-3 text-white font-semibold text-lg">
                                            {type}
                                        </h2>
                                    </div>
                                    <div className="py-4 px-6">
                                        <h3 className="text-2xl font-semibold text-gray-800">
                                            {title}
                                        </h3>
                                        <p className="py-2 text-lg text-gray-700">
                                            {text}
                                        </p>

                                        <div className="flex items-center mt-4 text-gray-700">
                                            <svg
                                                className="h-6 w-6 fill-current text-blue-400"
                                                viewBox="0 0 512 512"
                                            >
                                                <path d="M256 32c-88.004 0-160 70.557-160 156.801C96 306.4 256 480 256 480s160-173.6 160-291.199C416 102.557 344.004 32 256 32zm0 212.801c-31.996 0-57.144-24.645-57.144-56 0-31.357 25.147-56 57.144-56s57.144 24.643 57.144 56c0 31.355-25.148 56-57.144 56z" />
                                            </svg>
                                            <p className="px-2 text-sm">
                                                {place}
                                            </p>
                                        </div>
                                        <div className="flex items-center mt-4 text-gray-700">
                                            <svg
                                                className="h-6 w-6 fill-current text-blue-400"
                                                viewBox="0 0 512 512"
                                            >
                                                <path
                                                    d="M235.735,471.456c129.984,0,235.726-105.752,235.726-235.726c0-129.973-105.752-235.725-235.726-235.725
		C105.761,0.005,0,105.747,0,235.73C0,365.714,105.751,471.456,235.735,471.456z M421.152,193.942
		c-19.662-11.465-14.746,1.635-14.746,1.635s0,0,13.109,11.465c13.111,11.466,22.941,16.39,18.025,32.445
		c-4.914,16.057-13.109,1.961-29.49,15.072c-16.391,13.109,19.66,16.389,21.295,36.049c1.637,19.662-19.66,9.832-29.49,29.492
		s-1.635,40.965-6.551,58.99c-4.914,18.025-45.881,42.602-60.76,50.797s-4.781-18.025,0-36.051s-11.34-37.686-11.34-70.457
		s-9.83-22.939-39.322-22.939c-29.49,0-42.6-16.391-45.88-47.518c-3.28-31.135,24.576-62.261,37.685-72.091
		c13.111-9.831,31.137-19.661,49.152-9.831c18.025,9.831,24.576,19.661,44.236,19.661s19.66-6.55,31.135-14.746
		c11.465-8.195-16.391-18.025-32.77-16.313c-16.381,1.712-13.111-9.897-34.406-18.092c-21.297-8.195-29.492,8.195-36.051,11.465
		c-6.551,3.28-29.49,13.11-31.787,0c-2.285-13.11,12.117-14.745,26.871-14.745c14.746,0,1.635-11.465-3.279-19.661
		c-4.916-8.195-14.746-8.195-21.85-14.592c-7.096-6.397,8.74-18.178,25.119-14.267c16.381,3.911,9.83,15.75,27.855,14.114
		s0-18.025,0-33.899c0-15.874,19.662-15.262,32.771-21.592c13.109-6.331,29.49,27.635,40.965,41.377
		c3.797,4.552,9.219,2.534,14.766-2.113c28.984,33.354,48.367,75.228,53.836,121.338
		C436.824,217.695,438.346,203.973,421.152,193.942z M235.735,9.567c9.046,0,17.949,0.593,26.718,1.635
		c-3.213,8.941-8.436,15.616-8.436,15.616s-6.549,21.295-21.304,22.94c-14.755,1.645-32.771,0-40.966,13.11
		c-8.195,13.11-6.55,36.051-19.66,22.94c-13.11-13.11-1.635-14.114-14.746-27.54c-13.11-13.425-16.39-13.425-22.94-13.425
		c-1.932,0-4.122-3.337-5.862-8.214C160.468,19.378,196.968,9.567,235.735,9.567z M98.991,55.735
		c-0.364,2.362,1.711,5.795,11.781,9.993c19.661,8.195,24.193,24.423,15.138,23.782c-9.056-0.641-45.853,4.379-12.011,14.209
		c33.851,9.831,31.059,21.353,16.008,26.268c-15.052,4.916-11.829-16.361-15.109,4.944c-3.28,21.305-6.579,19.67-17.231,22.95
		c-10.653,3.28-30.323,19.67-30.323,31.136c0,11.465-6.56,17.882,6.55,27.712c13.11,9.83-4.103,27.809-10.299,14.708
		c-7.44-15.721-12.642-24.395-20.837-26.039c-8.195-1.635-18.752,11.465,0,24.575s19.661,21.305,19.661,31.135
		s13.569,9.83,23.992,8.195c10.414-1.635,31.805,26.221,39.14,37.686c7.325,11.467,20.435,22.941,38.46,27.855
		c18.025,4.916,24.576,16.391,14.746,24.576c-9.83,8.195-11.465,27.855-22.94,32.771c-11.475,4.914-13.11,19.66-19.661,26.221
		c-3.844,3.844-7.573,8.834-10.691,14.602c-9.782-5.498-19.115-11.705-27.941-18.543c-0.268-1.453-0.564-2.926-0.698-4.254
		c-1.635-16.391-3.28-36.051-13.11-44.236c-9.831-8.195-16.39-19.66-19.661-32.771c-3.271-13.109,4.915-32.77-1.635-45.881
		c-6.55-13.109-6.55-0.822-19.661-19.248c-13.11-18.428-13.11-18.438-21.305-33.183c-4.379-7.889-7.334-20.463-9.151-33.708
		C21.296,142.084,53.387,90.466,98.991,55.735z"
                                                />
                                            </svg>
                                            <p className="px-2 text-sm">
                                                <a
                                                    title="link"
                                                    href={link}
                                                >
                                                    {linkName}
                                                </a>
                                            </p>
                                        </div>
                                    </div>
                                </div>

    )
}