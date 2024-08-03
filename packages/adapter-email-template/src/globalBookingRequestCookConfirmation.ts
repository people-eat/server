export interface GlobalBookingRequestCookConfirmationInput {
    webAppUrl: string;

    customer: {
        firstName: string;
        profilePictureUrl?: string;
    };

    globalBookingRequest: {
        globalBookingRequestId: string;
        occasion: string;
        children: number;
        adults: number;
        location?: string;
        date: string;
        time: string;
        price: {
            perPerson: number;
            total: number;
            currency: string;
        };
    };

    chatMessage: string;
}

export function globalBookingRequestCookConfirmation({
    customer,
    globalBookingRequest,
    webAppUrl,
    chatMessage,
}: GlobalBookingRequestCookConfirmationInput): string {
    const cookProfileBookingRequestsUrl: string = webAppUrl + '/profile/bookings/r/' + globalBookingRequest.globalBookingRequestId;

    const formatPrice = (amount: number, currencyCode: string): string => Math.round(amount / 100).toFixed(2) + ' ' + currencyCode;

    return `
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">
    <head>
        <meta name=x-apple-disable-message-reformatting>
        <meta http-equiv=X-UA-Compatible>
        <meta charset=utf-8>
        <meta name=viewport content=target-densitydpi=device-dpi>
        <meta content=true name=HandheldFriendly>
        <meta content=width=device-width name=viewport>
        <style type="text/css">
            table {
                border-collapse: separate;
                table-layout: fixed;
                mso-table-lspace: 0pt;
                mso-table-rspace: 0pt
            }

            table td {
                border-collapse: collapse
            }

            .ExternalClass {
                width: 100%
            }

            .ExternalClass,
            .ExternalClass p,
            .ExternalClass span,
            .ExternalClass font,
            .ExternalClass td,
            .ExternalClass div {
                line-height: 100%
            }

            * {
                line-height: inherit;
                text-size-adjust: 100%;
                -ms-text-size-adjust: 100%;
                -moz-text-size-adjust: 100%;
                -o-text-size-adjust: 100%;
                -webkit-text-size-adjust: 100%;
                -webkit-font-smoothing: antialiased;
                -moz-osx-font-smoothing: grayscale
            }

            html {
                -webkit-text-size-adjust: none !important
            }

            img+div {
                display: none;
                display: none !important
            }

            img {
                Margin: 0;
                padding: 0;
                -ms-interpolation-mode: bicubic
            }

            h1, h2, h3, p, a {
                line-height: 1;
                overflow-wrap: normal;
                white-space: normal;
                word-break: break-word
            }

            a {
                text-decoration: none
            }

            h1, h2, h3, p {
                min-width: 100% !important;
                width: 100% !important;
                max-width: 100% !important;
                display: inline-block !important;
                border: 0;
                padding: 0;
                margin: 0
            }

            a[x-apple-data-detectors] {
                color: inherit !important;
                text-decoration: none !important;
                font-size: inherit !important;
                font-family: inherit !important;
                font-weight: inherit !important;
                line-height: inherit !important
            }

            a[href^="mailto"], a[href^="tel"], a[href^="sms"] {
                color: inherit;
                text-decoration: none
            }

            @media (min-width: 481px) {
                .hd {
                    display: none !important
                }
            }

            @media (max-width: 480px) {
                .hm {
                    display: none !important
                }
            }

            [style*="Albert Sans"] {
                font-family: 'Albert Sans', BlinkMacSystemFont, Segoe UI, Helvetica Neue, Arial, sans-serif !important;
            }

            @media only screen and (min-width: 481px) {
                .t3 {
                    mso-line-height-alt: 45px !important;
                    line-height: 45px !important;
                    display: block !important
                }

                .t9 {
                    padding-left: 50px !important;
                    padding-bottom: 60px !important;
                    padding-right: 50px !important
                }

                .t11 {
                    padding-left: 50px !important;
                    padding-bottom: 60px !important;
                    padding-right: 50px !important;
                    width: 500px !important
                }

                .t15 {
                    padding-bottom: 30px !important;
                    width: 600px !important
                }

                .t20 {
                    padding-bottom: 30px !important
                }

                .t21 {
                    line-height: 26px !important;
                    font-size: 24px !important;
                    letter-spacing: -1.56px !important;
                    mso-text-raise: 1px !important
                }

                .t28 {
                    padding: 48px 50px !important
                }

                .t30 {
                    padding: 48px 50px !important;
                    width: 500px !important
                }

                .t44,
                .t49 {
                    padding-bottom: 44px !important
                }

                .t145 {
                    padding-left: 10px !important;
                    width: 590px !important
                }

                .t150 {
                    padding-left: 10px !important
                }

                .t155 {
                    padding-left: 10px !important;
                    width: 590px !important
                }

                .t160 {
                    padding-left: 10px !important
                }

                .t173 {
                    mso-line-height-alt: 0px !important;
                    line-height: 0 !important;
                    display: none !important
                }

                .t175 {
                    width: 50% !important
                }

                .t178,
                .t180 {
                    padding-right: 5px !important
                }

                .t184 {
                    width: 50% !important
                }

                .t187,
                .t189 {
                    padding-left: 5px !important
                }

                .t193 {
                    padding-left: 10px !important;
                    width: 590px !important
                }

                .t198 {
                    padding-left: 10px !important
                }

                .t311,
                .t319 {
                    width: 250px !important
                }
            }
        </style>
        <!--[if !mso]><!-->
        <link href="https://fonts.googleapis.com/css2?family=Albert+Sans:wght@200;300;400;500;700;800&display=swap" rel="stylesheet" type="text/css">
        <!--<![endif]-->
        <!--[if mso]>
        <style type="text/css">
        div.t3{mso-line-height-alt:45px !important;line-height:45px !important;display:block !important}td.t11,td.t9{padding-left:50px !important;padding-bottom:60px !important;padding-right:50px !important}td.t15{padding-bottom:30px !important;width:600px !important}td.t20{padding-bottom:30px !important}h1.t21{line-height:26px !important;font-size:24px !important;letter-spacing:-1.56px !important;mso-text-raise:1px !important}td.t28,td.t30{padding:48px 50px !important}td.t44,td.t49{padding-bottom:44px !important}td.t145,td.t150,td.t155,td.t160{padding-left:10px !important}div.t173{mso-line-height-alt:0px !important;line-height:0 !important;display:none !important}div.t175{width:50% !important}td.t178,td.t180{padding-right:5px !important}div.t184{width:50% !important}td.t187,td.t189{padding-left:5px !important}td.t193,td.t198{padding-left:10px !important}td.t311,td.t319{width:250px !important}
        </style>
        <![endif]-->
        <!--[if mso]>
        <xml>
        <o:OfficeDocumentSettings>
        <o:AllowPNG/>
        <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
        </xml>
        <![endif]-->
    </head>

    <body class=t0 style="min-width:100%;Margin:0px;padding:0px;background-color:#242424;">
        <div class=t1 style="background-color:#242424;">
            <table role=presentation width=100% cellpadding=0 cellspacing=0 border=0 align=center>
                <tr>
                    <td class=t395 style="font-size:0;line-height:0;mso-line-height-rule:exactly;" valign=top align=center>
                        <!--[if mso]><v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false"><v:fill color=#242424 /></v:background><![endif]-->
                        <table role=presentation width=100% cellpadding=0 cellspacing=0 border=0 align=center>
                            <tr>
                                <td>
                                    <div class=t3 style="mso-line-height-rule:exactly;font-size:1px;display:none;">&nbsp;
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <table class=t10 role=presentation cellpadding=0 cellspacing=0 align=center>
                                        <tr>
                                            <!--[if !mso]><!-->
                                            <td class=t11
                                                style="background-color:#F8F8F8;overflow:hidden;width:540px;padding:0 30px 40px 30px;">
                                                <!--<![endif]-->
                                                <!--[if mso]><td class=t11 style="background-color:#F8F8F8;overflow:hidden;width:600px;padding:0 30px 40px 30px;"><![endif]-->
                                                <table role=presentation width=100% cellpadding=0 cellspacing=0>
                                                    <tr>
                                                        <td>
                                                            <div class=t298
                                                                style="mso-line-height-rule:exactly;mso-line-height-alt:16px;line-height:16px;font-size:1px;display:block;">
                                                                &nbsp;</div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <div class=t12
                                                                style="mso-line-height-rule:exactly;mso-line-height-alt:25px;line-height:25px;font-size:1px;display:block;">
                                                                &nbsp;</div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <table class=t14 role=presentation cellpadding=0 cellspacing=0
                                                                align=center>
                                                                <tr>
                                                                    <!--[if !mso]><!-->
                                                                    <td class=t15 style="width:398px;padding:0 0 20px 0;">
                                                                        <!--<![endif]-->
                                                                        <!--[if mso]><td class=t15 style="width:398px;padding:0 0 20px 0;"><![endif]-->
                                                                        <h1 class=t21
                                                                            style="margin-bottom:0;Margin-bottom:0;font-family:BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif,'Albert Sans';line-height:28px;font-weight:800;font-style:normal;font-size:22px;text-decoration:none;text-transform:none;letter-spacing:-1.04px;direction:ltr;color:#191919;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;">
                                                                            Du hast die globale Buchungsanfrage von ${
                                                                                customer.firstName
                                                                            } angenommen! 🎉</h1>
                                                                    </td>
                                                                </tr>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <table class=t125 role=presentation cellpadding=0 cellspacing=0
                                                                align=center>
                                                                <tr>
                                                                    <!--[if !mso]><!-->
                                                                    <td class=t126 style="width:600px;padding:0 0 22px 0;">
                                                                        <!--<![endif]-->
                                                                        <!--[if mso]><td class=t126 style="width:600px;padding:0 0 22px 0;"><![endif]-->
                                                                    </td>
                                                                </tr>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <table class=t105 role=presentation cellpadding=0 cellspacing=0
                                                                align=center>
                                                                <tr>
                                                                    <!--[if !mso]><!-->
                                                                    <td class=t106
                                                                        style="background-color:#FFFFFF;overflow:hidden;width:760px;padding:20px 20px 20px 20px;">
                                                                        <!--<![endif]-->
                                                                        <!--[if mso]><td class=t106 style="background-color:#FFFFFF;overflow:hidden;width:800px;padding:20px 20px 20px 20px;"><![endif]-->
                                                                        <div class=t112
                                                                            style="display:inline-table;width:100%;text-align:left;vertical-align:middle;">
                                                                            <!--[if mso]>
                                                                            <table role=presentation cellpadding=0 cellspacing=0 align=left valign=middle><tr><td class=t117 style="width:10px;" width=10></td><td width=84.33566 valign=middle><![endif]-->
                                                                            <!--[if mso]>
                                                                            </td><td class=t117 style="width:10px;" width=10></td><td class=t135 style="width:10px;" width=10></td><td width=335.66434 valign=middle><![endif]-->
                                                                            <div class=t136
                                                                                style="display:inline-table;text-align:initial;vertical-align:inherit;width:78.77041%;max-width:820px;">
                                                                                <div class=t137
                                                                                    style="padding:0 10px 0 10px;">
                                                                                    <table role=presentation width=100%
                                                                                        cellpadding=0 cellspacing=0
                                                                                        class=t138>
                                                                                        <tr>
                                                                                            <td class=t139
                                                                                                style="overflow:hidden;">
                                                                                                <table role=presentation
                                                                                                    width=100% cellpadding=0
                                                                                                    cellspacing=0>
                                                                                                    <tr>
                                                                                                        <td>
                                                                                                            <table
                                                                                                                class=t192
                                                                                                                role=presentation
                                                                                                                cellpadding=0
                                                                                                                cellspacing=0
                                                                                                                align=center>
                                                                                                                <tr>
                                                                                                                    <!--[if !mso]><!-->
                                                                                                                    <td class=t193
                                                                                                                        style="width:600px;">
                                                                                                                        <!--<![endif]-->
                                                                                                                        <!--[if mso]><td class=t193 style="width:600px;"><![endif]-->
                                                                                                                        <h1 class=t199 style="margin-bottom:0;Margin-bottom:0;font-family:BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif,'Albert Sans';line-height:16px;font-weight:700;font-style:normal;font-size:14px;text-decoration:none;text-transform:uppercase;direction:ltr;color:#1A1A1A;text-align:left;mso-line-height-rule:exactly;mso-text-raise:1px;">
                                                                                                                            Globale Buchungsanfrage
                                                                                                                        </h1>
                                                                                                                    </td>
                                                                                                                </tr>
                                                                                                            </table>
                                                                                                        </td>
                                                                                                    </tr>
                                                                                                    <tr>
                                                                                                        <td>
                                                                                                            <div class=t191
                                                                                                                style="mso-line-height-rule:exactly;mso-line-height-alt:10px;line-height:10px;font-size:1px;display:block;">
                                                                                                                &nbsp;</div>
                                                                                                        </td>
                                                                                                    </tr>
                                                                                                    <tr>
                                                                                                        <td>
                                                                                                            <table
                                                                                                                class=t154
                                                                                                                role=presentation
                                                                                                                cellpadding=0
                                                                                                                cellspacing=0
                                                                                                                align=center>
                                                                                                                <tr>
                                                                                                                    <!--[if !mso]><!-->
                                                                                                                    <td class=t155
                                                                                                                        style="width:600px;">
                                                                                                                        <!--<![endif]-->
                                                                                                                        <!--[if mso]><td class=t155 style="width:600px;"><![endif]-->
                                                                                                                        <h1 class=t161
                                                                                                                            style="margin-bottom:0;Margin-bottom:0;font-family:BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif,'Albert Sans';line-height:16px;font-weight:500;font-style:normal;font-size:12px;text-decoration:none;text-transform:uppercase;direction:ltr;color:#1A1A1A;text-align:left;mso-line-height-rule:exactly;mso-text-raise:1px;">
                                                                                                                            Privatköche in der Umgebung
                                                                                                                        </h1>
                                                                                                                    </td>
                                                                                                                </tr>
                                                                                                            </table>
                                                                                                        </td>
                                                                                                    </tr>
                                                                                                    <tr>
                                                                                                        <td>
                                                                                                            <div class=t142
                                                                                                                style="mso-line-height-rule:exactly;mso-line-height-alt:15px;line-height:15px;font-size:1px;display:block;">
                                                                                                                &nbsp;</div>
                                                                                                        </td>
                                                                                                    </tr>
                                                                                                    <tr>
                                                                                                        <td>
                                                                                                        </td>
                                                                                                    </tr>
                                                                                                </table>
                                                                                            </td>
                                                                                        </tr>
                                                                                    </table>
                                                                                </div>
                                                                            </div>
                                                                            <!--[if mso]>
                                                                            </td><td class=t135 style="width:10px;" width=10></td>
                                                                            </tr></table>
                                                                            <![endif]-->
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <table class=t376 role=presentation cellpadding=0 cellspacing=0
                                                                align=center>
                                                                <tr>
                                                                    <!--[if !mso]><!-->
                                                                    <td class=t377 style="width:600px;">
                                                                        <!--<![endif]-->
                                                                        <!--[if mso]><td class=t377 style="width:600px;"><![endif]-->
                                                                        <h1 class=t383 style="margin-bottom:0;Margin-bottom:0;font-family:BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif,'Albert Sans';line-height:41px;font-weight:800;font-style:normal;font-size:20px;text-decoration:none;text-transform:none;letter-spacing:-1.56px;direction:ltr;color:#191919;text-align:left;mso-line-height-rule:exactly;mso-text-raise:6px;">
                                                                            Zusammenfassung
                                                                        </h1>
                                                                    </td>
                                                                </tr>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <table class=t164 role=presentation cellpadding=0 cellspacing=0
                                                                align=center>
                                                                <tr>
                                                                    <!--[if !mso]><!-->
                                                                    <td class=t165
                                                                        style="background-color:#FFFFFF;overflow:hidden;width:520px;padding:14px 40px 0 40px;">
                                                                        <!--<![endif]-->
                                                                        <!--[if mso]><td class=t165 style="background-color:#FFFFFF;overflow:hidden;width:600px;padding:14px 40px 0 40px;"><![endif]-->
                                                                        <div class=t171
                                                                            style="display:inline-table;width:100%;text-align:left;vertical-align:top;">
                                                                            <!--[if mso]>
                                                                            <table role=presentation cellpadding=0 cellspacing=0 align=left valign=top><tr><td width=210 valign=top><![endif]-->
                                                                            <div class=t175
                                                                                style="display:inline-table;text-align:initial;vertical-align:inherit;width:100%;max-width:800px;">
                                                                                <table role=presentation width=100%
                                                                                    cellpadding=0 cellspacing=0 class=t177>
                                                                                    <tr>
                                                                                        <td class=t178
                                                                                            style="overflow:hidden;">
                                                                                            <table role=presentation
                                                                                                width=100% cellpadding=0
                                                                                                cellspacing=0>
                                                                                                <tr>
                                                                                                    <td>
                                                                                                        <table class=t207
                                                                                                            role=presentation
                                                                                                            cellpadding=0
                                                                                                            cellspacing=0
                                                                                                            align=center>
                                                                                                            <tr>
                                                                                                                <!--[if !mso]><!-->
                                                                                                                <td class=t208
                                                                                                                    style="overflow:hidden;width:800px;">
                                                                                                                    <!--<![endif]-->
                                                                                                                    <!--[if mso]><td class=t208 style="overflow:hidden;width:800px;"><![endif]-->
                                                                                                                    <table
                                                                                                                        role=presentation
                                                                                                                        width=100%
                                                                                                                        cellpadding=0
                                                                                                                        cellspacing=0>
                                                                                                                        <tr>
                                                                                                                            <td>
                                                                                                                                <table
                                                                                                                                    class=t211
                                                                                                                                    role=presentation
                                                                                                                                    cellpadding=0
                                                                                                                                    cellspacing=0
                                                                                                                                    align=center>
                                                                                                                                    <tr>
                                                                                                                                        <!--[if !mso]><!-->
                                                                                                                                        <td class=t212
                                                                                                                                            style="width:600px;">
                                                                                                                                            <!--<![endif]-->
                                                                                                                                            <!--[if mso]><td class=t212 style="width:600px;"><![endif]-->
                                                                                                                                            <h1 class=t218 style="margin-bottom:0;Margin-bottom:0;font-family:BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif,'Albert Sans';line-height:16px;font-weight:700;font-style:normal;font-size:14px;text-decoration:none;text-transform:uppercase;direction:ltr;color:#1A1A1A;text-align:left;mso-line-height-rule:exactly;mso-text-raise:1px;">
                                                                                                                                                Buchungsdetails
                                                                                                                                            </h1>
                                                                                                                                        </td>
                                                                                                                                    </tr>
                                                                                                                                </table>
                                                                                                                            </td>
                                                                                                                        </tr>
                                                                                                                        <tr>
                                                                                                                            <td>
                                                                                                                                <div class=t210
                                                                                                                                    style="mso-line-height-rule:exactly;mso-line-height-alt:10px;line-height:10px;font-size:1px;display:block;">
                                                                                                                                    &nbsp;
                                                                                                                                </div>
                                                                                                                            </td>
                                                                                                                        </tr>
                                                                                                                        <tr>
                                                                                                                            <td>
                                                                                                                                <table
                                                                                                                                    class=t221
                                                                                                                                    role=presentation
                                                                                                                                    cellpadding=0
                                                                                                                                    cellspacing=0
                                                                                                                                    align=center>
                                                                                                                                    <tr>
                                                                                                                                        <!--[if !mso]><!-->
                                                                                                                                        <td class=t222
                                                                                                                                            style="width:600px;">
                                                                                                                                            <!--<![endif]-->
                                                                                                                                            <!--[if mso]><td class=t222 style="width:600px;"><![endif]-->
                                                                                                                                            <p class=t228
                                                                                                                                                style="margin-bottom:0;Margin-bottom:0;font-family:BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif,'Albert Sans';line-height:22px;font-weight:500;font-style:normal;font-size:12px;text-decoration:none;text-transform:none;letter-spacing:-0.56px;direction:ltr;color:#242424;text-align:left;mso-line-height-rule:exactly;mso-text-raise:3px;">
                                                                                                                                                Anlass: ${
                                                                                                                                                    globalBookingRequest.occasion
                                                                                                                                                }
                                                                                                                                            </p>
                                                                                                                                        </td>
                                                                                                                                    </tr>
                                                                                                                                </table>
                                                                                                                            </td>
                                                                                                                        </tr>
                                                                                                                        <tr>
                                                                                                                            <td>
                                                                                                                                <table
                                                                                                                                    class=t231
                                                                                                                                    role=presentation
                                                                                                                                    cellpadding=0
                                                                                                                                    cellspacing=0
                                                                                                                                    align=center>
                                                                                                                                    <tr>
                                                                                                                                        <!--[if !mso]><!-->
                                                                                                                                        <td class=t232
                                                                                                                                            style="width:600px;">
                                                                                                                                            <!--<![endif]-->
                                                                                                                                            <!--[if mso]><td class=t232 style="width:600px;"><![endif]-->
                                                                                                                                            <p class=t238 style="margin-bottom:0;Margin-bottom:0;font-family:BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif,'Albert Sans';line-height:22px;font-weight:500;font-style:normal;font-size:12px;text-decoration:none;text-transform:none;letter-spacing:-0.56px;direction:ltr;color:#242424;text-align:left;mso-line-height-rule:exactly;mso-text-raise:3px;">
                                                                                                                                                Datum: ${
                                                                                                                                                    globalBookingRequest.date
                                                                                                                                                }
                                                                                                                                            </p>
                                                                                                                                        </td>
                                                                                                                                    </tr>
                                                                                                                                </table>
                                                                                                                            </td>
                                                                                                                        </tr>
                                                                                                                        <tr>
                                                                                                                            <td>
                                                                                                                                <table
                                                                                                                                    class=t241
                                                                                                                                    role=presentation
                                                                                                                                    cellpadding=0
                                                                                                                                    cellspacing=0
                                                                                                                                    align=center>
                                                                                                                                    <tr>
                                                                                                                                        <!--[if !mso]><!-->
                                                                                                                                        <td class=t242
                                                                                                                                            style="width:600px;">
                                                                                                                                            <!--<![endif]-->
                                                                                                                                            <!--[if mso]><td class=t242 style="width:600px;"><![endif]-->
                                                                                                                                            <p class=t248 style="margin-bottom:0;Margin-bottom:0;font-family:BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif,'Albert Sans';line-height:22px;font-weight:500;font-style:normal;font-size:12px;text-decoration:none;text-transform:none;letter-spacing:-0.56px;direction:ltr;color:#242424;text-align:left;mso-line-height-rule:exactly;mso-text-raise:3px;">
                                                                                                                                                Uhrzeit: ${
                                                                                                                                                    globalBookingRequest.time
                                                                                                                                                }
                                                                                                                                            </p>
                                                                                                                                        </td>
                                                                                                                                    </tr>
                                                                                                                                </table>
                                                                                                                            </td>
                                                                                                                        </tr>
                                                                                                                        <tr>
                                                                                                                            <td>
                                                                                                                                <table
                                                                                                                                    class=t251
                                                                                                                                    role=presentation
                                                                                                                                    cellpadding=0
                                                                                                                                    cellspacing=0
                                                                                                                                    align=center>
                                                                                                                                    <tr>
                                                                                                                                        <!--[if !mso]><!-->
                                                                                                                                        <td class=t252
                                                                                                                                            style="width:600px;">
                                                                                                                                            <!--<![endif]-->
                                                                                                                                            <!--[if mso]><td class=t252 style="width:600px;"><![endif]-->
                                                                                                                                            <p class=t258 style="margin-bottom:0;Margin-bottom:0;font-family:BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif,'Albert Sans';line-height:22px;font-weight:500;font-style:normal;font-size:12px;text-decoration:none;text-transform:none;letter-spacing:-0.56px;direction:ltr;color:#242424;text-align:left;mso-line-height-rule:exactly;mso-text-raise:3px;">
                                                                                                                                                Adresse des Events: ${
                                                                                                                                                    globalBookingRequest.location
                                                                                                                                                }
                                                                                                                                            </p>
                                                                                                                                        </td>
                                                                                                                                    </tr>
                                                                                                                                </table>
                                                                                                                            </td>
                                                                                                                        </tr>
                                                                                                                    </table>
                                                                                                                </td>
                                                                                                            </tr>
                                                                                                        </table>
                                                                                                    </td>
                                                                                                </tr>
                                                                                            </table>
                                                                                        </td>
                                                                                    </tr>
                                                                                </table>
                                                                                <!--[if !mso]><!-->
                                                                                <div class=t173
                                                                                    style="mso-line-height-rule:exactly;mso-line-height-alt:10px;line-height:10px;font-size:1px;display:block;">
                                                                                    &nbsp;</div>
                                                                                <!--<![endif]-->
                                                                            </div>
                                                                            <!--[if mso]>
                                                                            </td><td width=210 valign=top><![endif]-->
                                                                            <div class=t184
                                                                                style="display:inline-table;text-align:initial;vertical-align:inherit;width:100%;max-width:800px;">
                                                                                <table role=presentation width=100%
                                                                                    cellpadding=0 cellspacing=0 class=t186>
                                                                                    <tr>
                                                                                        <td class=t187
                                                                                            style="overflow:hidden;">
                                                                                            <table role=presentation
                                                                                                width=100% cellpadding=0
                                                                                                cellspacing=0>
                                                                                                <tr>
                                                                                                    <td>
                                                                                                        <table class=t266
                                                                                                            role=presentation
                                                                                                            cellpadding=0
                                                                                                            cellspacing=0
                                                                                                            align=center>
                                                                                                            <tr>
                                                                                                                <!--[if !mso]><!-->
                                                                                                                <td class=t267
                                                                                                                    style="overflow:hidden;width:800px;">
                                                                                                                    <!--<![endif]-->
                                                                                                                    <!--[if mso]><td class=t267 style="overflow:hidden;width:800px;"><![endif]-->
                                                                                                                    <table
                                                                                                                        role=presentation
                                                                                                                        width=100%
                                                                                                                        cellpadding=0
                                                                                                                        cellspacing=0>
                                                                                                                        <tr>
                                                                                                                            <td>
                                                                                                                                <div class=t268
                                                                                                                                    style="mso-line-height-rule:exactly;mso-line-height-alt:21px;line-height:21px;font-size:1px;display:block;">
                                                                                                                                    &nbsp;
                                                                                                                                </div>
                                                                                                                            </td>
                                                                                                                        </tr>
                                                                                                                        <tr>
                                                                                                                            <td>
                                                                                                                                <table
                                                                                                                                    class=t270
                                                                                                                                    role=presentation
                                                                                                                                    cellpadding=0
                                                                                                                                    cellspacing=0
                                                                                                                                    align=center>
                                                                                                                                    <tr>
                                                                                                                                        <!--[if !mso]><!-->
                                                                                                                                        <td class=t271
                                                                                                                                            style="width:600px;">
                                                                                                                                            <!--<![endif]-->
                                                                                                                                            <!--[if mso]><td class=t271 style="width:600px;"><![endif]-->
                                                                                                                                            <p class=t277 style="margin-bottom:0;Margin-bottom:0;font-family:BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif,'Albert Sans';line-height:22px;font-weight:500;font-style:normal;font-size:12px;text-decoration:none;text-transform:none;letter-spacing:-0.56px;direction:ltr;color:#242424;text-align:left;mso-line-height-rule:exactly;mso-text-raise:3px;">
                                                                                                                                                Anzahl Erwachsene: ${
                                                                                                                                                    globalBookingRequest.adults
                                                                                                                                                }
                                                                                                                                            </p>
                                                                                                                                        </td>
                                                                                                                                    </tr>
                                                                                                                                </table>
                                                                                                                            </td>
                                                                                                                        </tr>
                                                                                                                        <tr>
                                                                                                                            <td>
                                                                                                                                <table
                                                                                                                                    class=t280
                                                                                                                                    role=presentation
                                                                                                                                    cellpadding=0
                                                                                                                                    cellspacing=0
                                                                                                                                    align=center>
                                                                                                                                    <tr>
                                                                                                                                        <!--[if !mso]><!-->
                                                                                                                                        <td class=t281
                                                                                                                                            style="width:600px;">
                                                                                                                                            <!--<![endif]-->
                                                                                                                                            <!--[if mso]><td class=t281 style="width:600px;"><![endif]-->
                                                                                                                                            <p class=t287
                                                                                                                                                style="margin-bottom:0;Margin-bottom:0;font-family:BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif,'Albert Sans';line-height:22px;font-weight:500;font-style:normal;font-size:12px;text-decoration:none;text-transform:none;letter-spacing:-0.56px;direction:ltr;color:#242424;text-align:left;mso-line-height-rule:exactly;mso-text-raise:3px;">
                                                                                                                                                Anzahl Kinder: ${
                                                                                                                                                    globalBookingRequest.children
                                                                                                                                                }
                                                                                                                                            </p>
                                                                                                                                        </td>
                                                                                                                                    </tr>
                                                                                                                                </table>
                                                                                                                            </td>
                                                                                                                        </tr>
                                                                                                                        <tr>
                                                                                                                            <td>
                                                                                                                                <table
                                                                                                                                    class=t290
                                                                                                                                    role=presentation
                                                                                                                                    cellpadding=0
                                                                                                                                    cellspacing=0
                                                                                                                                    align=center>
                                                                                                                                    <tr>
                                                                                                                                        <!--[if !mso]><!-->
                                                                                                                                        <td class=t291
                                                                                                                                            style="width:600px;">
                                                                                                                                            <!--<![endif]-->
                                                                                                                                            <!--[if mso]><td class=t291 style="width:600px;"><![endif]-->
                                                                                                                                            <p class=t297
                                                                                                                                                style="margin-bottom:0;Margin-bottom:0;font-family:BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif,'Albert Sans';line-height:22px;font-weight:500;font-style:normal;font-size:12px;text-decoration:none;text-transform:none;letter-spacing:-0.56px;direction:ltr;color:#242424;text-align:left;mso-line-height-rule:exactly;mso-text-raise:3px;">
                                                                                                                                                <span
                                                                                                                                                    class=t320
                                                                                                                                                    style="margin-bottom:0;Margin-bottom:0;font-weight:400;font-style:normal;mso-line-height-rule:exactly;">
                                                                                                                                                    Budget pro Person: ${formatPrice(
                                                                                                                                                        globalBookingRequest
                                                                                                                                                            .price
                                                                                                                                                            .perPerson,
                                                                                                                                                        globalBookingRequest
                                                                                                                                                            .price
                                                                                                                                                            .currency,
                                                                                                                                                    )}
                                                                                                                                                </span>
                                                                                                                                            </p>
                                                                                                                                        </td>
                                                                                                                                    </tr>
                                                                                                                                </table>
                                                                                                                            </td>
                                                                                                                        </tr>
                                                                                                                        <tr>
                                                                                                                            <td>
                                                                                                                                <table
                                                                                                                                    class=t323
                                                                                                                                    role=presentation
                                                                                                                                    cellpadding=0
                                                                                                                                    cellspacing=0
                                                                                                                                    align=center>
                                                                                                                                    <tr>
                                                                                                                                        <!--[if !mso]><!-->
                                                                                                                                        <td class=t324
                                                                                                                                            style="width:600px;">
                                                                                                                                            <!--<![endif]-->
                                                                                                                                            <!--[if mso]><td class=t324 style="width:600px;"><![endif]-->
                                                                                                                                            <p class=t330
                                                                                                                                                style="margin-bottom:0;Margin-bottom:0;font-family:BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif,'Albert Sans';line-height:22px;font-weight:500;font-style:normal;font-size:12px;text-decoration:none;text-transform:none;letter-spacing:-0.56px;direction:ltr;color:#242424;text-align:left;mso-line-height-rule:exactly;mso-text-raise:3px;">
                                                                                                                                                <span class="t331" style="margin-bottom:0;Margin-bottom:0;font-weight:700;font-style:normal;mso-line-height-rule:exactly;">
                                                                                                                                                    Gesamtsumme: ${formatPrice(
                                                                                                                                                        globalBookingRequest
                                                                                                                                                            .price
                                                                                                                                                            .total,
                                                                                                                                                        globalBookingRequest
                                                                                                                                                            .price
                                                                                                                                                            .currency,
                                                                                                                                                    )}
                                                                                                                                                </span>
                                                                                                                                            </p>
                                                                                                                                        </td>
                                                                                                                                    </tr>
                                                                                                                                </table>
                                                                                                                            </td>
                                                                                                                        </tr>
                                                                                                                        <tr>
                                                                                                                            <td>
                                                                                                                                <table
                                                                                                                                    class=t387
                                                                                                                                    role=presentation
                                                                                                                                    cellpadding=0
                                                                                                                                    cellspacing=0
                                                                                                                                    align=center>
                                                                                                                                    <tr>
                                                                                                                                        <!--[if !mso]><!-->
                                                                                                                                        <td class=t388
                                                                                                                                            style="width:600px;">
                                                                                                                                            <!--<![endif]-->
                                                                                                                                            <!--[if mso]><td class=t388 style="width:600px;"><![endif]-->
                                                                                                                                            <p class=t394
                                                                                                                                                style="margin-bottom:0;Margin-bottom:0;font-family:BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif,'Albert Sans';line-height:15px;font-weight:200;font-style:normal;font-size:12px;text-decoration:none;text-transform:none;letter-spacing:-0.56px;direction:ltr;color:#242424;text-align:left;mso-line-height-rule:exactly;mso-text-raise:1px;">
                                                                                                                                                Bitte beachte, dass die Fahrtkosten und Plattform Fees (4%) nicht in der Anfrage berücksichtigt sind.
                                                                                                                                            </p>
                                                                                                                                        </td>
                                                                                                                                    </tr>
                                                                                                                                </table>
                                                                                                                            </td>
                                                                                                                        </tr>
                                                                                                                    </table>
                                                                                                                </td>
                                                                                                            </tr>
                                                                                                        </table>
                                                                                                    </td>
                                                                                                </tr>
                                                                                            </table>
                                                                                        </td>
                                                                                    </tr>
                                                                                </table>
                                                                            </div>
                                                                            <!--[if mso]>
                                                                            </td>
                                                                            </tr></table>
                                                                            <![endif]-->
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <table class=t339 role=presentation cellpadding=0 cellspacing=0
                                                                align=center>
                                                                <tr>
                                                                    <!--[if !mso]><!-->
                                                                    <td class=t340
                                                                        style="background-color:#FFFFFF;overflow:hidden;width:800px;">
                                                                        <!--<![endif]-->
                                                                        <!--[if mso]><td class=t340 style="background-color:#FFFFFF;overflow:hidden;width:800px;"><![endif]-->
                                                                        <table role=presentation width=100% cellpadding=0
                                                                            cellspacing=0>
                                                                            <tr>
                                                                                <td>
                                                                                    <div class=t341
                                                                                        style="mso-line-height-rule:exactly;mso-line-height-alt:20px;line-height:20px;font-size:1px;display:block;">
                                                                                        &nbsp;</div>
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>
                                                                                    <table class=t343 role=presentation
                                                                                        cellpadding=0 cellspacing=0
                                                                                        align=left>
                                                                                        <tr>
                                                                                            <!--[if !mso]><!-->
                                                                                            <td class=t344
                                                                                                style="background-color:#FFFFFF;width:460px;padding:0 0 0 40px;">
                                                                                                <!--<![endif]-->
                                                                                                <!--[if mso]><td class=t344 style="background-color:#FFFFFF;width:500px;padding:0 0 0 40px;"><![endif]-->
                                                                                                <p class=t350
                                                                                                    style="margin-bottom:0;Margin-bottom:0;font-family:BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif,'Albert Sans';line-height:22px;font-weight:700;font-style:normal;font-size:14px;text-decoration:none;text-transform:none;letter-spacing:-0.56px;direction:ltr;color:#333333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;">
                                                                                                    Nachricht</p>
                                                                                            </td>
                                                                                        </tr>
                                                                                    </table>
                                                                                </td>
                                                                            </tr>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <table class=t353 role=presentation cellpadding=0 cellspacing=0
                                                                align=center>
                                                                <tr>
                                                                    <!--[if !mso]><!-->
                                                                    <td class=t354
                                                                        style="background-color:#FFFFFF;width:521px;padding:0 39px 20px 40px;">
                                                                        <!--<![endif]-->
                                                                        <!--[if mso]><td class=t354 style="background-color:#FFFFFF;width:600px;padding:0 39px 20px 40px;"><![endif]-->
                                                                        <p class=t360
                                                                            style="margin-bottom:0;Margin-bottom:0;font-family:BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif,'Albert Sans';line-height:15px;font-weight:300;font-style:normal;font-size:10px;text-decoration:none;text-transform:none;letter-spacing:-0.56px;direction:ltr;color:#333333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;">
                                                                            ${chatMessage}
                                                                        </p>
                                                                    </td>
                                                                </tr>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <div class=t352
                                                                style="mso-line-height-rule:exactly;mso-line-height-alt:12px;line-height:12px;font-size:1px;display:block;">
                                                                &nbsp;</div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <table class=t363 role=presentation cellpadding=0 cellspacing=0
                                                                align=center>
                                                                <tr>
                                                                    <!--[if !mso]><!-->
                                                                    <td class=t364 style="width:600px;">
                                                                        <!--<![endif]-->
                                                                        <!--[if mso]><td class=t364 style="width:600px;"><![endif]-->
                                                                        <p class=t370 style="margin-bottom:0;Margin-bottom:0;font-family:BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif,'Albert Sans';line-height:22px;font-weight:500;font-style:normal;font-size:14px;text-decoration:none;text-transform:none;letter-spacing:-0.56px;direction:ltr;color:#333333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;">
                                                                            In der Zwischenzeit kannst du dich in dein <a href="${webAppUrl}/profile" class=t373 style="margin-bottom:0;Margin-bottom:0;color:#FF6433;mso-line-height-rule:exactly;">Profil einloggen</a>, dein Profil fertigstellen und den <span class=t371 style="margin-bottom:0;Margin-bottom:0;mso-line-height-rule:exactly;">aktuellen</span> Stand deiner Buchung einsehen.
                                                                        </p>
                                                                    </td>
                                                                </tr>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <div class=t308
                                                                style="mso-line-height-rule:exactly;mso-line-height-alt:24px;line-height:24px;font-size:1px;display:block;">
                                                                &nbsp;</div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <table class=t310 role=presentation cellpadding=0 cellspacing=0
                                                                align=left>
                                                                <tr>
                                                                    <!--[if !mso]><!-->
                                                                    <td class=t311
                                                                        style="background-color:#FF6433;overflow:hidden;width:353px;text-align:center;line-height:44px;mso-line-height-rule:exactly;mso-text-raise:10px;border-radius:44px 44px 44px 44px;">
                                                                        <!--<![endif]-->
                                                                        <!--[if mso]><td class=t311 style="background-color:#FF6433;overflow:hidden;width:353px;text-align:center;line-height:44px;mso-line-height-rule:exactly;mso-text-raise:10px;border-radius:44px 44px 44px 44px;"><![endif]-->
                                                                        <a href="${cookProfileBookingRequestsUrl}" style="
                display: block;
                font-family: BlinkMacSystemFont,
                    Segoe UI, Helvetica Neue, Arial,
                    sans-serif, 'Albert Sans';
                line-height: 44px;
                font-weight: 800;
                font-style: normal;
                font-size: 12px;
                text-decoration: none;
                text-transform: uppercase;
                letter-spacing: 2.4px;
                direction: ltr;
                color: #f8f8f8;
                text-align: center;
                mso-line-height-rule: exactly;
                mso-text-raise: 10px;
            " target="_blank">
                                                                            Zum Chat
                                                                        </a>
                                                                    </td>
                                                                </tr>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <div class=t309
                                                                style="mso-line-height-rule:exactly;mso-line-height-alt:40px;line-height:40px;font-size:1px;display:block;">
                                                                &nbsp;</div>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <table class=t29 role=presentation cellpadding=0 cellspacing=0 align=center>
                                        <tr>
                                            <!--[if !mso]><!-->
                                            <td class=t30
                                                style="background-color:#F7F7F7;overflow:hidden;width:540px;padding:40px 30px 40px 30px;">
                                                <!--<![endif]-->
                                                <!--[if mso]><td class=t30 style="background-color:#F7F7F7;overflow:hidden;width:600px;padding:40px 30px 40px 30px;"><![endif]-->
                                                <table role=presentation width=100% cellpadding=0 cellspacing=0>
                                                    <tr>
                                                        <td>
                                                            <table class=t33 role=presentation cellpadding=0 cellspacing=0
                                                                align=center>
                                                                <tr>
                                                                    <!--[if !mso]><!-->
                                                                    <td class=t34 style="width:600px;">
                                                                        <!--<![endif]-->
                                                                        <!--[if mso]><td class=t34 style="width:600px;"><![endif]-->
                                                                        <p class="t40" style="margin-bottom:0;Margin-bottom:0;font-family:BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif,'Albert Sans';line-height:22px;font-weight:800;font-style:normal;font-size:18px;text-decoration:none;text-transform:none;letter-spacing:-0.9px;direction:ltr;color:#757575;text-align:center;mso-line-height-rule:exactly;mso-text-raise:1px;">
                                                                            Folge uns auf Social Media
                                                                        </p>
                                                                    </td>
                                                                </tr>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <table class=t43 role=presentation cellpadding=0 cellspacing=0
                                                                align=center>
                                                                <tr>
                                                                    <!--[if !mso]><!-->
                                                                    <td class=t44
                                                                        style="overflow:hidden;width:800px;padding:10px 0 36px 0;">
                                                                        <!--<![endif]-->
                                                                        <!--[if mso]><td class=t44 style="overflow:hidden;width:800px;padding:10px 0 36px 0;"><![endif]-->
                                                                        <div class=t50
                                                                            style="display:inline-table;width:100%;text-align:center;vertical-align:top;">
                                                                            <!--[if mso]>
                                                                            <table role=presentation cellpadding=0 cellspacing=0 align=center valign=top><tr><td class=t75 style="width:10px;" width=10></td><td width=24 valign=top><![endif]-->
                                                                            <div class=t76
                                                                                style="display:inline-table;text-align:initial;vertical-align:inherit;width:33.33333%;max-width:44px;">
                                                                                <div class=t77
                                                                                    style="padding:0 10px 0 10px;">
                                                                                    <table role=presentation width=100%
                                                                                        cellpadding=0 cellspacing=0
                                                                                        class=t78>
                                                                                        <tr>
                                                                                            <td class=t79>
                                                                                                <div style="font-size:0px;">
                                                                                                    <img class=t80
                                                                                                        style="display:block;border:0;height:auto;width:100%;Margin:0;max-width:100%;"
                                                                                                        width=24 height=24
                                                                                                        src=images/3.png />
                                                                                                </div>
                                                                                            </td>
                                                                                        </tr>
                                                                                    </table>
                                                                                </div>
                                                                            </div>
                                                                            <!--[if mso]>
                                                                            </td><td class=t75 style="width:10px;" width=10></td><td class=t65 style="width:10px;" width=10></td><td width=24 valign=top><![endif]-->
                                                                            <div class=t66
                                                                                style="display:inline-table;text-align:initial;vertical-align:inherit;width:33.33333%;max-width:44px;">
                                                                                <div class=t67
                                                                                    style="padding:0 10px 0 10px;">
                                                                                    <table role=presentation width=100%
                                                                                        cellpadding=0 cellspacing=0
                                                                                        class=t68>
                                                                                        <tr>
                                                                                            <td class=t69>
                                                                                                <div style="font-size:0px;">
                                                                                                    <img class=t70
                                                                                                        style="display:block;border:0;height:auto;width:100%;Margin:0;max-width:100%;"
                                                                                                        width=24 height=24
                                                                                                        src=images/2.png />
                                                                                                </div>
                                                                                            </td>
                                                                                        </tr>
                                                                                    </table>
                                                                                </div>
                                                                            </div>
                                                                            <!--[if mso]>
        </td><td class=t65 style="width:10px;" width=10></td><td class=t55 style="width:10px;" width=10></td><td width=24 valign=top><![endif]-->
                                                                            <div class=t56
                                                                                style="display:inline-table;text-align:initial;vertical-align:inherit;width:33.33333%;max-width:44px;">
                                                                                <div class=t57
                                                                                    style="padding:0 10px 0 10px;">
                                                                                    <table role=presentation width=100%
                                                                                        cellpadding=0 cellspacing=0
                                                                                        class=t58>
                                                                                        <tr>
                                                                                            <td class=t59>
                                                                                                <div style="font-size:0px;">
                                                                                                    <img class=t60
                                                                                                        style="display:block;border:0;height:auto;width:100%;Margin:0;max-width:100%;"
                                                                                                        width=24 height=24
                                                                                                        src=images/1.png />
                                                                                                </div>
                                                                                            </td>
                                                                                        </tr>
                                                                                    </table>
                                                                                </div>
                                                                            </div>
                                                                            <!--[if mso]>
        </td><td class=t55 style="width:10px;" width=10></td>
        </tr></table>
        <![endif]-->
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <table class=t93 role=presentation cellpadding=0 cellspacing=0
                                                                align=center>
                                                                <tr>
                                                                    <!--[if !mso]><!-->
                                                                    <td class=t94 style="width:600px;">
                                                                        <!--<![endif]-->
                                                                        <!--[if mso]><td class=t94 style="width:600px;"><![endif]-->
                                                                        <p class=t100
                                                                            style="margin-bottom:0;Margin-bottom:0;font-family:BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif,'Albert Sans';line-height:22px;font-weight:500;font-style:normal;font-size:12px;text-decoration:none;text-transform:none;direction:ltr;color:#888888;text-align:center;mso-line-height-rule:exactly;mso-text-raise:3px;">
                                                                            Montgolfier-Allee.24, 60486 Frankfurt am Main
                                                                        </p>
                                                                    </td>
                                                                </tr>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <table class=t83 role=presentation cellpadding=0 cellspacing=0
                                                                align=center>
                                                                <tr>
                                                                    <!--[if !mso]><!-->
                                                                    <td class=t84 style="width:600px;">
                                                                        <!--<![endif]-->
                                                                        <!--[if mso]><td class=t84 style="width:600px;"><![endif]-->
                                                                        <p class="t90" style="margin-bottom:0;Margin-bottom:0;font-family:BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif,'Albert Sans';line-height:22px;font-weight:500;font-style:normal;font-size:12px;text-decoration:none;text-transform:none;direction:ltr;color:#888888;text-align:center;mso-line-height-rule:exactly;mso-text-raise:3px;">
                                                                            <a class=t101 href="${webAppUrl}/privacy-policy" style="margin-bottom:0;Margin-bottom:0;font-weight:700;font-style:normal;text-decoration:none;direction:ltr;color:#888888;mso-line-height-rule:exactly;" target=_blank>Privacy Policy</a>
                                                                        </p>
                                                                    </td>
                                                                </tr>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </div>
    </body>

    </html>
    `;
}
