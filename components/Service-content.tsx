import Card from "./ui/Card"
export default function ServicePage() {
return(
    <div className="md:p-50">
        <h2 className="flex justify-center text-center text-3xl pt-20 md:pt-0 md:text-5xl font-regular">
                Services We Provide is Here
              </h2> 
          {/* First Section - Card on left, Text on right */}
          <div className="flex items-center justify-center my-8">
                    <div className="border-t border-gray-300 flex-grow"></div>
                    <p className="px-4 text-2xl md:text-5xl font-extralight">HYDROLOGY</p>
                    <div className="border-t border-gray-300 flex-grow"></div>
                </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 md:p-4 pt-4"> 
                    <Card 
                        src="/pic-rbased/hydrology.jpg"
                        title={""}
                        description={""}
                    />
                    <div className="flex flex-col items-center justify-center space-y-4">
                        <h2 className="text-2xl font-extralight md:text-5xl lg:text-6xl text-center">Hydrology</h2>
                        <p className="text-justify text-xl font-extralight md:text-lg lg:text-2xl px-6 pt-4 leading-relaxed text-center">
                        Hydrological modeling to quantify the distribution of water coming into the basin into different components like runoff and ground water.
                        </p>
                       
                    </div>
                </div>

                <div className="flex items-center justify-center my-8">
                    <div className="border-t border-gray-300 flex-grow"></div>
                    <p className="px-4 text-2xl md:text-5xl font-extralight">AGRICULTURE STUDIES</p>
                    <div className="border-t border-gray-300 flex-grow"></div>
                </div>
                
                {/* Second Section - Text on left, Card on right */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 p-4 pt-8">  
                    <div className="flex flex-col items-center justify-center space-y-4">
                        <h2 className="text-2xl font-extralight md:text-5xl lg:text-6xl text-center">Agriculture Studies</h2>
                        <p className="text-justify text-xl md:text-2xl lg:text-2xl font-extralight px-6 pt-4 leading-relaxed text-center">
                        Irrigation monitoring and management, command area mapping. Land cover and land degradation mapping. 
                        </p> 
                    </div>
                    <div className="space-y-4">
                        <Card 
                            src={"/pic-rbased/studies.jpg"}
                            title={""}
                            description={""}
                        />
                    </div>
                </div>
                <div className="flex items-center justify-center my-8">
                    <div className="border-t border-gray-300 flex-grow"></div>
                    <p className="px-4 text-2xl md:text-5xl font-extralight">URBAN STUDIES</p>
                    <div className="border-t border-gray-300 flex-grow"></div>
                </div>
{/*third sttarts here*/}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 p-4 pt-8">  
                    <Card 
                        src="/pic-rbased/urban-studies.jpg"
                        title={""}
                        description={""}
                    />
                    <div className="flex flex-col items-center justify-center space-y-4">
                        <h2 className="text-4xl font-extralight md:text-5xl lg:text-6xl text-center">Urban Studies</h2>
                        <p className="text-justify text-xl md:text-2xl lg:text-2xl font-extralight px-6 pt-4 leading-relaxed text-center">
                        Urban water logging. Urban expansion. Site suitability studies. Water distribution system analysis and planning. Digitization and multi-layer map making.
                        </p>
                    </div>
                </div>



<div className="flex items-center justify-center my-8">
                    <div className="border-t border-gray-300 flex-grow"></div>
                    <p className="px-4 text-2xl md:text-5xl font-extralight">FORESTRY AND ECOLOGY</p>
                    <div className="border-t border-gray-300 flex-grow"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:reverse-grid-cols-2 gap-8 p-4 pt-8"> 
                    <Card 
                        src="/pic-rbased/forestry-ecology.jpg"
                        title={""}
                        description={""}
                    />
                    <div className="flex flex-col items-center justify-center space-y-4">
                        <h2 className="text-2xl font-extralight md:text-5xl lg:text-6xl text-center">Forestry and Ecology</h2>
                        <p className="text-xl text-justify font-extralight md:text-lg lg:text-2xl px-6 pt-4 leading-relaxed text-center">
                        Forest type classification. Forest density classification. Habitat suitability Map. Forest fire spread Modelling. Environmental Impact Assessment, EIA studies.
                        </p>
                       
                    </div>
                </div>

                <div className="flex items-center justify-center my-8">
                    <div className="border-t border-gray-300 flex-grow"></div>
                    <p className="px-4 text-2xl text-justify md:text-5xl font-extralight">DISASTER MANAGEMENT</p>
                    <div className="border-t border-gray-300 flex-grow"></div>
                </div>
                
                {/* Second Section - Text on left, Card on right */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 p-4 pt-8">  
                    <div className="flex flex-col items-center justify-center space-y-4">
                        <h2 className="text-2xl font-extralight md:text-5xl lg:text-6xl text-center">Disaster Management</h2>
                        <p className="text-xl text-justify md:text-2xl lg:text-2xl font-extralight px-6 pt-4 leading-relaxed text-center">
                        Flood Risk assessment and mitigation strategies. Forest fire mapping and prediction. Landslide risk zonation. Drought prediction and damage assessment.
                        </p> 
                    </div>
                    <div className="space-y-4">
                        <Card 
                            src={"/pic-rbased/dist-mngt.jpg"}
                            title={""}
                            description={""}
                        />
                    </div>
                </div>
                <div className="flex items-center justify-center my-8">
                    <div className="border-t border-gray-300 flex-grow"></div>
                    <p className="px-4 text-2xl md:text-5xl font-extralight">CLIMATOLOGY</p>
                    <div className="border-t border-gray-300 flex-grow"></div>
                </div>
{/*third sttarts here*/}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 p-4 pt-8">  
                    <Card 
                        src="/pic-rbased/climatology.jpg"
                        title={""}
                        description={"This is a Real Life Problems Through GIS and RBASED solutions."}
                    />
                    <div className="flex flex-col items-center justify-center space-y-4">
                        <h2 className="text-4xl font-extralight md:text-5xl lg:text-6xl text-center">Climatology</h2>
                        <p className="text-xl text-justify md:text-2xl lg:text-2xl font-extralight px-6 pt-4 leading-relaxed text-center">
                        Numerical modelling of rainfall. Cloudburst prediction. Climate change and climate variability studies.
                        </p>
                    </div>
                </div>

<div className="flex items-center justify-center my-8">
                    <div className="border-t border-gray-300 flex-grow"></div>
                    <p className="px-4 text-2xl md:text-5xl font-extralight">ENERGY SECTOR</p>
                    <div className="border-t border-gray-300 flex-grow"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:reverse-grid-cols-2 gap-8 p-4 pt-8"> 
                    <Card 
                        src="/pic-rbased/enery-sec.jpg"
                        title={""}
                        description={""}
                    />
                    <div className="flex flex-col items-center justify-center space-y-4">
                        <h2 className="text-2xl font-extralight md:text-5xl lg:text-6xl text-center">Energy Sector</h2>
                        <p className="text-xl text-justify font-extralight md:text-lg lg:text-2xl px-6 pt-4 leading-relaxed text-center">
                        Use of remote sensing and GIS in solar energy. GIS and bioenergy. GIS for wind power. 3D solar rooftop potential estimation. Terrain suitability and stability for proposed sits. 
                        </p>
                       
                    </div>
                </div>

                <div className="flex items-center justify-center my-8">
                    <div className="border-t border-gray-300 flex-grow"></div>
                    <p className="px-4 text-2xl md:text-5xl font-extralight">HEALTH GIS</p>
                    <div className="border-t border-gray-300 flex-grow"></div>
                </div>
                
                {/* Second Section - Text on left, Card on right */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 p-4 pt-8">  
                    <div className="flex flex-col items-center justify-center space-y-4">
                        <h2 className="text-2xl font-extralight md:text-5xl lg:text-6xl text-center">Health GIS</h2>
                        <p className="text-xl text-justify md:text-2xl lg:text-2xl font-extralight px-6 pt-4 leading-relaxed text-center">
                        Mapping and Management of Health Infrastructure. Geospatially studying the spread of any infection. Medical Resources allocation and management. 
                        </p> 
                    </div>
                    <div className="space-y-4">
                        <Card 
                            src={"/pic-rbased/gis-system.jpg"}
                            title={""}
                            description={""}
                        />
                    </div>
                </div>
                <div className="flex items-center justify-center my-8">
                    <div className="border-t border-gray-300 flex-grow"></div>
                    <p className="px-4 text-2xl md:text-5xl font-extralight">CAPACITY BUILDING CELL</p>
                    <div className="border-t border-gray-300 flex-grow"></div>
                </div>
{/*third sttarts here*/}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 p-4 pt-8">  
                    <Card 
                        src="/pic-rbased/gis-system.jpg"
                        title={""}
                        description={""}
                    />
                    <div className="flex flex-col items-center justify-center space-y-4">
                        <h2 className="text-4xl font-extralight md:text-5xl lg:text-6xl text-center">Capacity Building Cell</h2>
                        <p className="text-xl text-justify md:text-2xl lg:text-2xl font-extralight px-6 pt-4 leading-relaxed text-center">
                        Workshops for Professionals like IFS and CWC officers. Professional course of Remote Sensing and GIS in Engineering Colleges. 
                        </p>
                    </div>
                </div>


                <div className="flex items-center justify-center my-8">
                    <div className="border-t border-gray-300 flex-grow"></div>
                    <p className="px-4 text-2xl md:text-5xl font-extralight">PHOTOGRAMMETRY</p>
                    <div className="border-t border-gray-300 flex-grow"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 p-4 pt-8"> 
                    <Card 
                        src="/pic-rbased/photogramentry.jpg"
                        title={""}
                        description={""}
                    />
                    <div className="flex flex-col items-center justify-center space-y-4">
                        <h2 className="text-2xl font-extralight md:text-5xl lg:text-6xl text-center">Photogrammetry</h2>
                        <p className="text-xl text-justify font-extralight md:text-lg lg:text-2xl px-6 pt-4 leading-relaxed">
                        Description of the new service offered, highlighting its benefits and applications. 
                        </p>
                       
                    </div>
                </div>

                <div className="flex items-center justify-center my-8">
                    <div className="border-t border-gray-300 flex-grow"></div>
                    <p className="px-4 text-2xl md:text-5xl font-extralight">GEOGRAPHIC INFORMATION SYSTEM</p>
                    <div className="border-t border-gray-300 flex-grow"></div>
                </div>
                
                {/* Second Section - Text on left, Card on right */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 p-4 pt-8">  
                    <div className="flex flex-col items-center justify-center space-y-4">
                        <h2 className="text-xl font-extralight md:text-5xl lg:text-6xl text-center">Geographic Information System</h2>
                        <p className="text-xl text-justify md:text-2xl lg:text-2xl font-extralight px-6 pt-4 leading-relaxed text-center">
                        Description of the new service offered, highlighting its benefits and applications. 
                        </p> 
                    </div>
                    <div className="space-y-4">
                        <Card 
                            src={"/pic-rbased/capacity.jpg"}
                            title={""}
                            description={""}
                        />
                    </div>
                </div>

    </div>
)};
