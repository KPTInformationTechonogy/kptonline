const Location = () => {
    return (
    <div className="mt-8 bg-white shadow-md rounded-md p-1 flex items-center justify-between gap-4">
    <iframe
        src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d249776.76409234034!2d8.241718031865947!3d11.990967690262309!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sng!4v1745415550215!5m2!1sen!2sng"
        width="1500"
        height="450"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Google Map"
    ></iframe>
    </div>
);
};

export default Location;