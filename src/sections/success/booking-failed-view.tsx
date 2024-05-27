import Image from "next/image";
import Link from "next/link";
import BookingFailedImage from "src/assets/illustrations/BOOKING_FAILED.png";

const BookingFailed = () => {
  return (
    <section className="success-booking-page">
      <div className="container-fluid text-center">
        <Image src={BookingFailedImage} alt={"Ticket Booking Success Image"} height={400} />
        <h3 className="confirmation-title mt-5">Booking Failed 🥺</h3>
        <p className="message">
          We're sorry, but your booking could not be processed at this time. Please double-check your information and
          try again later. If you continue to experience issues, please contact{" "}
          <Link href="MailTo:support@hulyax.com.au">support@hulyax.com.au</Link> for assistance.
        </p>
        <Link href={`/user/profile`}>
          <button className="theme-button view-tickets-btn">View Your Tickets</button>
        </Link>
      </div>
    </section>
  );
};

export default BookingFailed;
