const NotFound = () => {
  return (
    <section className="min-h-[calc(100vh-4rem)] flex flex-col justify-center items-center">
      <div>
        <div className="mb-8 text-9xl text-center font-semibold text-primary-100">
          404
        </div>
        <p className="mb-6 text-center text-2xl font-semibold">
          Page is not found
        </p>
      </div>
    </section>
  );
};

export default NotFound;
