import SpinnerGif from './assets/spinner.gif'

export const Spinner = () => {
  return (
    <div className="w-100 mt-20">
        <img width={180} src={SpinnerGif} alt="Loading..." className="text-center mx-auto" />
    </div>
  )
}
