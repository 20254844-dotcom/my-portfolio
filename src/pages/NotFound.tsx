function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-[80vh]">
      <h1 className="text-4xl font-bold mb-2">404</h1>
      <p className="text-gray-600 mb-4">Page not found</p>
      <a href="/" className="text-blue-500 hover:underline">
        Go back home
      </a>
    </div>
  );
}

export default NotFound;
