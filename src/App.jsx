import { createSignal } from "solid-js";
import { createStore } from "solid-js/store";

function App() {
  const [dapatkanNegara, setelNegara] = createSignal("Indonesia");
  const [data, setData] = createStore({
    country: undefined,
    cases: 0,
    deaths: 0,
    recovered: 0,
    today: {
      cases: 0,
      deaths: 0,
      recovered: 0
    },
    error: undefined,
    flag: undefined
  });
  const [loading, setelLoading] = createSignal(false);

  const requestHandle = () => {
    setelLoading(true);
    const negara = dapatkanNegara();
    fetch("https://disease.sh/v3/covid-19/countries/" + encodeURIComponent(negara)).then((response) => response.json()).then(d => {
      setData({
        error: undefined,
        country: d.country,
        cases: d.cases,
        recovered: d.recovered,
        deaths: d.deaths,
        today: {
          cases: d.todayCases,
          deaths: d.todayDeaths,
          recovered: d.todayRecovered
        },
        flag: d.countryInfo.flag
      });
      setelLoading(false);
    }).catch(() => {
      setData({ flag: undefined, error: "Negara tidak ditemukan" });
      setelLoading(false);
    });
  } 
  return (
    <>
      <div className="bg-gray-100">
        <div className="mx-auto container">
          <div className="min-h-screen lg:py-12 md:py-8 py-4" id="utama">
            <h1 className="text-center font-sans font-black text-4xl">😷 Cari Statistik Negara COVID19</h1>
            <p className="text-xl font-sans text-center mt-3">Ketik nama negara di kolom bawah ini untuk mencari</p>

            <span className="justify-center text-center">
              <form className="mt-5" method="get" action="#">
                <input disabled={loading()} onChange={(e) => setelNegara(e.target.value)} className="shadow-gray-400 focus:border-indigo-500 focus:ring-blue-600 duration-300 outline-none" placeholder="Indonesia" value={dapatkanNegara()} type="text" />
                <button disabled={loading()} type="submit" onClick={() => requestHandle()} className="shadow-blue-400 bg-blue-500 w-32 py-2 ml-3 rounded outline-none">
                🔍
                </button>
              </form>
              <div className="mt-10" hidden={data.error ? false : true}>
                <p className="text-stroke-md font-sans text-xl text-red-600">
                  {data.error}
                </p>
              </div>
              <div className="mt-10" hidden={data.flag ? false : true}>
                <img className="mx-auto object-center image-render-pixel rounded w-32" src={data.flag} />
                <h1 className="font-bold text-xl mt-2 antialiased">
                  {data.country}
                </h1>
                <p className="text-dark-400 font-sans text-md font-semibold">
                  Pada hari ini negara <strong>{data.country}</strong> memiliki sebanyak <strong>{data.today.cases.toLocaleString()}</strong> kasus, <strong>{data.today.deaths.toLocaleString()}</strong> kematian, dan sebanyak <strong>{data.today.recovered.toLocaleString()}</strong> yang sembuh.
                  Dan, jika pada keseluruhan. Total kasus sebanyak <strong>{data.cases.toLocaleString()}</strong>, yang sembuh sebanyak <strong>{data.recovered.toLocaleString()}</strong>, dan kematian sebanyak <strong>{data.deaths.toLocaleString()}</strong>
                </p>
              </div>

              <footer className="font-sans text-md font-semibold mt-5">
              📝 Built with <a href="https://solidjs.com">Solid</a> and <a href="https://disease.sh">Disease API</a>
              </footer>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
