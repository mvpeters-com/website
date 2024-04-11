import Animation from "./Animation.jsx";

export default function App() {
  return <>
    <div className={'container'}>
      <div className={'text email'}>
        <a href={'mailto:simon@mvpeters.com'}>simon@mvpeters.com</a>
      </div>

      <div className={'text phone'}>
        <a href={'tel:+32476399887'}>32476399887</a>
      </div>

    </div>

    <Animation/>
  </>
}
