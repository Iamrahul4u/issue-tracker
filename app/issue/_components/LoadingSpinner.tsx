export default function LoadingSpinner({ visible }: { visible: boolean }) {
  return (
    <div className={`${visible ? "block" : "hidden"}`}>
      <div className='border-t-transparent animate-spin rounded-full border-white-400 border-2 h-4 w-4'></div>
    </div>
  )
}
