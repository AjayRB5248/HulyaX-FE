import Image from "next/image";
import Link from "next/link";
import SuccessImg from "src/assets/illustrations/BOOKING_SUCCESS.png";

const BookingSuccess = () => {
  return (
    <section className="success-booking-page">
      <div className="container-fluid text-center">
        <Image src={SuccessImg} alt={"Ticket Booking Success Image"} height={400} />
        <h3 className="confirmation-title mt-5">Booking confirmed successfully! 🎉 🎉</h3>
        <p className="message">
          Thank you for choosing to book tickets with Hulya X! Your reservation is confirmed. You can view your tickets in your profile page and download it or mail to your email account.
        </p>

        <Link href={`/user/profile`}>
          <button className="theme-button view-tickets-btn">View Your Tickets</button>
        </Link>
      </div>
    </section>
  );
};

export default BookingSuccess;
