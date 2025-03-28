import { View, Text, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/Header";
import { Stack } from "expo-router";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const terms = () => {
  const theme = useSelector((state: RootState) => state.theme);

  const backgroundColor = theme.theme === "dark" ? "bg-black" : "bg-white";

  const headingStyle = {
    header: {
      fontFamily: "RobotoRegular",
      fontSize: 20,
      fontWeight: "bold" as "bold",
      color: theme.theme === "dark" ? "#fff" : "#000",
      textAlign: "center" as "center",
      marginTop: 40,
    },
    subTitle: {
      fontFamily: "RobotoLight",
      color: theme.theme === "dark" ? "#fff" : "#000",
      fontSize: 15,
      textAlign: "center" as "center",
      marginTop: 7,
    },
    paragraph: {
      lineHeight: 21,
      color: theme.theme === "dark" ? "#fff" : "#000",
      fontSize: 14,
      textAlign: "left" as "left",
      marginTop: 20,
    },
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} name="terms" />

      <SafeAreaView className={`${backgroundColor} flex-1`}>
        <Header headerTitle="Terms and Conditions" />
        <ScrollView className="mx-6 mb-4">
          <Text style={headingStyle.header}>
            Terms and Policy of Use Relating Hertz
          </Text>
          <Text style={headingStyle.subTitle}>Last updated July 20, 2022</Text>

          <Text style={headingStyle.paragraph}>
            These Terms and Policy (“the Terms and Policy”) govern your (“the
            User”) use of the Hertz application. By accessing and using the
            application, the User agrees to be bound by the Terms and Policy set
            out in this legal notice. The User may not access, display, use,
            download, and/or otherwise copy or distribute Content obtained on
            the website for marketing and other purposes without the consent of
            the Provider.
          </Text>

          <Text style={headingStyle.header}>Electronic Communications</Text>

          <Text style={headingStyle.subTitle}>Last updated July 20, 2022</Text>
          <Text style={headingStyle.paragraph}>
            By using this application or communicating with the Provider by
            electronic means, the user consents and acknowledges that any and
            all agreements, notices, disclosures, or any other communication
            satisfies any legal requirement, including but not limited to the
            requirement that such communications should be in writing or in
            audio formats.
          </Text>

          <Text style={headingStyle.header}>E-Commerce & Privacy</Text>
          <Text style={headingStyle.subTitle}>Last updated July 20, 2022</Text>
          <Text style={headingStyle.paragraph}>
            Hertz builds technologies and services that enable people to
            broadcast, create Digital shops, and grow businesses. These Terms
            govern your use of Hertz features, apps, services, technologies, and
            software we offer (the Hertz Products or Products), except where we
            expressly state that separate terms (and not these) apply. These
            Products are provided to you by Hertz Incorporated Private Limited
            Company. We don’t sell your personal data to broadcasters, and we
            don’t share information that directly identifies you (such as your
            name, email address, or other contact information) with broadcasters
            unless you give us specific permission. Instead, broadcasters can
            tell us things like the kind of audience they want to see their
            content, and we show those contents to people who may be interested.
          </Text>

          <Text style={headingStyle.header}>The service we provide</Text>
          <Text style={headingStyle.subTitle}>Last updated July 20, 2022</Text>
          <Text style={headingStyle.paragraph}>
            We show you personalized Ad Broadcasts, offers, and other sponsored
            or commercial content to help you discover content, products, and
            services that are offered by the many content creators, individuals,
            businesses, and organizations that utilize our Products.
          </Text>

          <Text style={headingStyle.header}>Who can use Hertz</Text>
          <Text style={headingStyle.subTitle}>Last updated July 20, 2022</Text>
          <Text style={headingStyle.paragraph}>
            When it is safer and more accountable. For this reason, you must:
            {"\n"}• Provide for your account the same name that you use in
            everyday life.{"\n"}• Provide accurate information about yourself.
            {"\n"}• Not share your password, give access to your Hertz account
            to others, or transfer your account to anyone else (without our
            permission).
          </Text>

          <Text style={headingStyle.header}>What you can share</Text>
          <Text style={headingStyle.subTitle}>Last updated July 20, 2022</Text>
          <Text style={headingStyle.paragraph}>
            When using and broadcasting using Hertz, it is not accepted you use
            it at the expense of the safety and well-being of others or the
            integrity of our community. You therefore agree not to engage in the
            conduct described below (or to facilitate or support others in doing
            so):
            {"\n"}1. You may not use our Products to do or share anything:
            {"\n"}
            <Text className="">
              • That violates these Terms, the Community Standards, or other
              terms and policies that apply to your use of our Products.
            </Text>
            {"\n"}• That is unlawful, misleading, discriminatory, or fraudulent
            (or assists someone else in using our Products in such a way).
            {"\n"}• That you do not own or have the necessary rights to share.
            {"\n"}• That infringes or violates someone else's rights, including
            their intellectual property rights (such as by infringing another’s
            copyright or trademark, or distributing or selling counterfeit or
            pirated goods), unless an exception or limitation applies under
            applicable law.
            {"\n"}2. You may not upload viruses or malicious code, use the
            services to send spam, or do anything else that could disable,
            overburden, interfere with, or impair the proper working, integrity,
            operation, or appearance of our services, systems, or Products.
            {"\n"}3. You may not access or collect data from our Products using
            automated means (without our prior permission) or attempt to access
            data you do not have permission to access.
            {"\n"}4. You may not proxy, request, or collect Product usernames or
            passwords, or misappropriate access tokens.
            {"\n"}5. You may not sell, license, or purchase any data obtained
            from us or our services, except as provided in the Platform Terms.
            {"\n"}6. You may not misuse any reporting, flagging, dispute, or
            appeals channel, such as by making fraudulent, duplicative, or
            groundless reports or appeals.
            {"\n"}We can remove or restrict access to content that is in
            violation of these provisions. We can also suspend or disable your
            account for conduct that violates these provisions. If we remove
            content that you have shared in violation of the Community
            Standards, we’ll let you know and explain any options you have to
            request another review, unless you seriously or repeatedly violate
            these Terms or if doing so may expose us or others to legal
            liability; harm our community of users; compromise or interfere with
            the integrity or operation of any of our services, systems; where we
            are restricted due to technical limitations; or where we are
            prohibited from doing so for legal reasons.
            {"\n"}To help support our community, we encourage you to report
            content or conduct that you believe violates your rights (including
            intellectual property rights) or our terms and policies, if this
            feature exists in your jurisdiction. We also can remove or restrict
            access to content features, services, or information if we determine
            that doing so is reasonably necessary to avoid or mitigate misuse of
            our services or adverse legal or regulatory impacts to Hertz.
          </Text>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default terms;
