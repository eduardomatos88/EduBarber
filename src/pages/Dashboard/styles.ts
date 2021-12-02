import { shade } from 'polished'
import styled from 'styled-components'

export const Container = styled.div`
  background-color: #28262e;
  min-height: 100vh;
`

export const Header = styled.header`
  padding: 32px 0;
  background-color: #232129;
`

export const HeaderContent = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  > img {
    height: 80px;
  }
  button {
    margin-left: auto;
    background-color: transparent;
    border: 0;
    svg {
      color: #999591;
      width: 20px;
      height: 20px;
    }
  }
`

export const Content = styled.main`
  max-width: 1120px;
  margin: 64px auto;
  display: flex;
`

export const Profile = styled.div`
  display: flex;
  align-items: center;
  margin-left: 80px;
  img {
    width: 56px;
    height: 56px;
    border-radius: 50%;
  }
  div {
    display: flex;
    flex-direction: column;
    margin-left: 16px;
    line-height: 24px;
    span {
      color: #f4ede8;
    }
    strong {
      color: #ff9000;
    }
  }
`

export const Schedule = styled.section`
  flex: 1;
  margin-right: 120px;
  h1 {
    font-size: 36px;
  }
  p {
    margin-top: 8px;
    color: #ff9000;
    display: flex;
    font-weight: 500;
    span {
      display: flex;
      align-items: center;
    }
    span + span::before {
      content: '';
      width: 1px;
      height: 12px;
      align-items: center;
      background-color: #ff9000;
      margin: 0 8px;
    }
  }
`

export const NextAppointment = styled.div`
  margin-top: 64px;
  > strong {
    color: #999591;
    font-size: 20px;
    font-weight: 400;
  }
  div {
    background-color: #3e3b47;
    display: flex;
    align-items: center;
    padding: 16px 24px;
    border-radius: 10px;
    margin-top: 24px;
    position: relative;
    &::before {
      content: '';
      position: absolute;
      height: 80%;
      width: 2px;
      left: 0;
      top: 10%;
      background-color: #ff9000;
      border-radius: 0 2px 2px 0;
    }
    img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
    }
    strong {
      margin-left: 24px;
      color: #fff;
    }
    span {
      margin-left: auto;
      display: flex;
      align-items: center;
      color: #999591;
      svg {
        color: #ff9000;
        margin-right: 8px;
      }
    }
  }
`

export const Section = styled.section`
  margin-top: 48px;
  > strong {
    color: #999591;
    font-size: 20px;
    line-height: 26px;
    border-bottom: 1px solid #3e3b47;
    display: block;
    padding-bottom: 16px;
    margin-bottom: 16px;
  }
  > p {
    color: #999591;
  }
`
export const Appointment = styled.div`
  display: flex;
  align-items: center;

  & + div {
    margin-top: 16px;
  }

  span {
    margin-left: auto;
    display: flex;
    align-items: center;
    color: #f4ede8;
    width: 70px;
    svg {
      color: #ff9000;
      margin-right: 8px;
    }
  }
  div {
    flex: 1;
    background-color: #3e3b47;
    display: flex;
    align-items: center;
    padding: 16px 24px;
    border-radius: 10px;
    margin-left: 24px;
    img {
      width: 56px;
      height: 56px;
      border-radius: 50%;
    }
    strong {
      margin-left: 24px;
      color: #fff;
      font-size: 20px;
    }
  }
`

export const Calendar = styled.aside`
  width: 380px;
  .DayPicker {
    background-color: #232129;
    border-radius: 10px;
  }

  .DayPicker-wrapper {
    padding-bottom: 0;
  }

  .DayPicker,
  .DayPicker-Month {
    width: 100%;
  }

  .DayPicker-Month {
    border-collapse: separate;
    border-spacing: 8px;
    margin: 16px;
  }

  .DayPicker-Day--available:not(.DayPicker-Day--outside) {
    background-color: #3e3b47;
    border-radius: 10px;
    color: #fff;
  }

  .DayPicker:not(.DayPicker--interactionDisabled)
    .DayPicker-Day:not(.DayPicker-Day--disabled):not(.DayPicker-Day--selected):not(.DayPicker-Day--disabled) {
    background-color: ${shade(0.2, '#3e3b47')};
  }
  .DayPicker-Day--today {
    font-weight: normal;
  }

  .DayPicker-Day--disabled {
    color: #666360 !important;
    background-color: transparent !important;
  }

  .DayPicker-Day--selected {
    background-color: #ff9000 !important;
    border-radius: 10px;
    color: #232129 !important;
  }
`
