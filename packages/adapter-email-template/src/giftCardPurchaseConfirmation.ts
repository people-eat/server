export interface GiftCardPurchaseConfirmationInput {
    buyer: {
        firstName: string;
    };

    message: string;
    occasion: string;

    recipient: {
        firstName: string;
        lastName: string;
    };

    balance: number;

    automatedEmailDelivery: boolean;
}

export function giftCardPurchaseConfirmation({
    buyer,
    message,
    occasion,
    recipient,
    balance,
    automatedEmailDelivery,
}: GiftCardPurchaseConfirmationInput): string {
    const formatPrice = (amount: number, currencyCode: string): string => Math.round(amount / 100).toFixed(2) + ' ' + currencyCode;

    const messageSection: string = message ? `<div><span style="font-weight: bold;">Nachricht:</span> ${message}</div><div> </div>` : '';

    return `
        <!DOCTYPE html>
        <html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:v="urn:schemas-microsoft-com:vml">
        <head>
        <title>
        </title>
        <!--[if !mso]><!-->
        <meta content="IE=edge" http-equiv="X-UA-Compatible"/>
        <!--<![endif]-->
        <meta content="text/html; charset=utf-8" http-equiv="Content-Type"/>
        <meta content="width=device-width, initial-scale=1" name="viewport"/>
        <!--[if mso]>
        <noscript>
        <xml>
        <o:OfficeDocumentSettings>
        <o:AllowPNG/>
        <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
        </xml>
        </noscript>
        <![endif]-->
        <!--[if lte mso 11]>
        <style type="text/css" data-inliner="ignore">
        .mj-outlook-group-fix { width:100% !important; }
        </style>
        <![endif]-->
        <!--[if !mso]><!--><!--<![endif]-->
        <style>a:link {color:#5076D6;font-weight:700;text-decoration:underline;font-style:normal}
        a:visited {color:#5076D6;font-weight:700;text-decoration:underline;font-style:normal}
        a:active {color:#5076D6;font-weight:700;text-decoration:underline;font-style:normal}
        a:hover {color:#5076D6;font-weight:700;text-decoration:underline;font-style:normal}</style><style>@import url(https://static-forms.klaviyo.com/fonts/api/v1/SaC624/custom_fonts.css);
        #outlook a {
        padding: 0
        }
        body {
        margin: 0;
        padding: 0;
        -webkit-text-size-adjust: 100%;
        -ms-text-size-adjust: 100%
        }
        table, td {
        border-collapse: collapse;
        mso-table-lspace: 0;
        mso-table-rspace: 0
        }
        img {
        border: 0;
        line-height: 100%;
        outline: none;
        text-decoration: none;
        -ms-interpolation-mode: bicubic
        }
        p {
        display: block;
        margin: 13px 0
        }
        @media only screen and (min-width: 480px) {
        .mj-column-per-100 {
        width: 100% !important;
        max-width: 100%
        }
        }
        .moz-text-html .mj-column-per-100 {
        width: 100% !important;
        max-width: 100%
        }
        @media only screen and (max-width: 480px) {
        div.kl-row.colstack div.kl-column {
        display: block !important;
        width: 100% !important
        }
        }
        @media only screen and (max-width: 480px) {
        .kl-text {
        padding-right: 18px !important;
        padding-left: 18px !important
        }
        }
        @media only screen and (max-width: 480px) {
        .component-wrapper .mob-no-spc {
        padding-left: 0 !important;
        padding-right: 0 !important
        }
        }
        @media only screen and (max-width: 480px) {
        td.kl-img-base-auto-width {
        width: 100% !important
        }
        }
        @media screen and (max-width: 480px) {
        .kl-sl-stk {
        display: block !important;
        width: 100% !important;
        padding: 0 0 9px !important;
        text-align: center !important
        }
        .kl-sl-stk.lbls {
        padding: 0 !important
        }
        .kl-sl-stk.spcblk {
        display: none !important
        }
        }
        @media only screen and (max-width: 480px) {
        table.mj-full-width-mobile {
        width: 100% !important
        }
        td.mj-full-width-mobile {
        width: auto !important
        }
        }
        img {
        border: 0;
        height: auto;
        line-height: 100%;
        outline: none;
        text-decoration: none;
        max-width: 100%
        }
        .root-container {
        background-repeat: repeat !important;
        background-size: auto !important;
        background-position: left top !important
        }
        .root-container-spacing {
        padding-top: 50px !important;
        padding-bottom: 20px !important;
        font-size: 0 !important
        }
        .content-padding {
        padding-left: 0 !important;
        padding-right: 0 !important
        }
        .content-padding.first {
        padding-top: 0 !important
        }
        .content-padding.last {
        padding-bottom: 0 !important
        }
        @media only screen and (max-width: 480px) {
        td.mobile-only {
        display: table-cell !important
        }
        div.mobile-only {
        display: block !important
        }
        table.mobile-only {
        display: table !important
        }
        .desktop-only {
        display: none !important
        }
        }
        @media only screen and (max-width: 480px) {
        .table-mobile-only {
        display: table-cell !important;
        max-height: none !important
        }
        .table-mobile-only.block {
        display: block !important
        }
        .table-mobile-only.inline-block {
        display: inline-block !important
        }
        .table-desktop-only {
        max-height: 0 !important;
        display: none !important;
        mso-hide: all !important;
        overflow: hidden !important
        }
        }
        p {
        margin-left: 0;
        margin-right: 0;
        margin-top: 0;
        margin-bottom: 0;
        padding-bottom: 1em
        }
        @media only screen and (max-width: 480px) {
        .kl-text > div, .kl-table-subblock div, .kl-split-subblock > div {
        font-size: 14px !important;
        line-height: 1.5 !important
        }
        }
        h1 {
        color: #1A1A1A;
        font-family: Tahoma, Verdana, Segoe, sans-serif;
        font-size: 32px;
        font-style: normal;
        font-weight: 400;
        line-height: 1.1;
        letter-spacing: 0;
        margin: 0;
        margin-bottom: 16px;
        text-align: center
        }
        @media only screen and (max-width: 480px) {
        h1 {
        font-size: 32px !important;
        line-height: 1.5 !important
        }
        }
        h2 {
        color: #1A1A1A;
        font-family: Helvetica, Arial, sans-serif;
        font-size: 14px;
        font-style: normal;
        font-weight: 700;
        line-height: 1.1;
        letter-spacing: 0;
        margin: 0;
        margin-bottom: 16px;
        text-align: left
        }
        @media only screen and (max-width: 480px) {
        h2 {
        font-size: 14px !important;
        line-height: 1.5 !important
        }
        }
        h3 {
        color: #1A1A1A;
        font-family: Helvetica, Arial, sans-serif;
        font-size: 20px;
        font-style: normal;
        font-weight: 700;
        line-height: 1.1;
        letter-spacing: 0;
        margin: 0;
        margin-bottom: 12px;
        text-align: left
        }
        @media only screen and (max-width: 480px) {
        h3 {
        font-size: 24px !important;
        line-height: 1.1 !important
        }
        }
        h4 {
        color: #222427;
        font-family: Helvetica, Arial, sans-serif;
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: 1.1;
        letter-spacing: 0;
        margin: 0;
        margin-bottom: 9px;
        text-align: left
        }
        @media only screen and (max-width: 480px) {
        h4 {
        font-size: 18px !important;
        line-height: 1.1 !important
        }
        }
        @media only screen and (max-width: 480px) {
        .root-container {
        width: 100% !important
        }
        .root-container-spacing {
        padding: 10px !important
        }
        .content-padding {
        padding-left: 0 !important;
        padding-right: 0 !important
        }
        .content-padding.first {
        padding-top: 0 !important
        }
        .content-padding.last {
        padding-bottom: 0 !important
        }
        .component-wrapper {
        padding-left: 0 !important;
        padding-right: 0 !important
        }
        }</style></head>
        <body style="word-spacing:normal;background-color:#FF6433;">
        <div class="root-container" id="bodyTable" style="background-color:#FF6433;">
        <div class="root-container-spacing">
        <table align="center" border="0" cellpadding="0" cellspacing="0" class="kl-section" role="presentation" style="background:#FF6433;background-color:#FF6433;width:100%;">
        <tbody>
        <tr>
        <td>
        <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="kl-section-outlook" style="width:600px;" width="600" bgcolor="#FF6433" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
        <div style="margin:0px auto;max-width:600px;">
        <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
        <tbody>
        <tr>
        <td style="direction:ltr;font-size:0px;padding:0px;text-align:center;">
        <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" bgcolor="#FFFFFF" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
        <div style="background:#FFFFFF;background-color:#FFFFFF;margin:0px auto;border-radius:0px 0px 0px 0px;max-width:600px;">
        <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#FFFFFF;background-color:#FFFFFF;width:100%;border-radius:0px 0px 0px 0px;">
        <tbody>
        <tr>
        <td style="direction:ltr;font-size:0px;padding:20px 0;padding-bottom:0px;padding-left:0px;padding-right:0px;padding-top:0px;text-align:center;">
        <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><![endif]-->
        <div class="content-padding first">
        <!--[if true]><table border="0" cellpadding="0" cellspacing="0" width="600" style="width:600px;direction:ltr"><tr><![endif]-->
        <div class="kl-row colstack" style="display:table;table-layout:fixed;width:100%;">
        <!--[if true]><td style="vertical-align:top;width:600px;"><![endif]-->
        <div class="kl-column" style="display:table-cell;vertical-align:top;width:100%;">
        <div class="mj-column-per-100 mj-outlook-group-fix component-wrapper" style="font-size:0px;text-align:left;direction:ltr;vertical-align:top;width:100%;">
        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;" width="100%">
        <tbody>
        <tr>
        <td class="" style="vertical-align:top;padding-top:9px;padding-right:18px;padding-bottom:9px;padding-left:18px;">
        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="" width="100%">
        <tbody>
        <tr>
        <td align="left" class="kl-text" style="font-size:0px;padding:0px;padding-top:0px;padding-right:0px;padding-bottom:0px;padding-left:0px;word-break:break-word;">
        <div style="font-family:Helvetica, Arial, sans-serif;font-size:16px;font-style:normal;font-weight:400;letter-spacing:0px;line-height:1.5;text-align:left;color:#414141;"><div><span style="font-weight: bold; font-size: 25px; color: rgb(7, 0, 48);">Bestellungsbestätigung</span></div></div>
        </td>
        </tr>
        </tbody>
        </table>
        </td>
        </tr>
        </tbody>
        </table>
        </div>
        <div class="mj-column-per-100 mj-outlook-group-fix component-wrapper" style="font-size:0px;text-align:left;direction:ltr;vertical-align:top;width:100%;">
        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;" width="100%">
        <tbody>
        <tr>
        <td class="" style="vertical-align:top;padding-top:21px;padding-right:153px;padding-bottom:21px;padding-left:153px;">
        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="" width="100%">
        <tbody>
        <tr>
        <td align="center" class="kl-image" style="font-size:0px;word-break:break-word;">
        <table border="0" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border-spacing:0px;">
        <tbody>
        <tr>
        <td class="kl-img-base-auto-width" style="border:0;padding:0px 0px 0px 0px;width:294px;" valign="top">
        <img src="https://d3k81ch9hvuctc.cloudfront.net/company/SaC624/images/5a5ada74-87dc-4dab-978c-9db829a0e240.png" style="display:block;outline:none;text-decoration:none;height:auto;font-size:13px;width:100%;" width="294"/>
        </td>
        </tr>
        </tbody>
        </table>
        </td>
        </tr>
        </tbody>
        </table>
        </td>
        </tr>
        </tbody>
        </table>
        </div>
        <div class="mj-column-per-100 mj-outlook-group-fix component-wrapper" style="font-size:0px;text-align:left;direction:ltr;vertical-align:top;width:100%;">
        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;" width="100%">
        <tbody>
        <tr>
        <td class="" style="background-color:#FFFFFF;vertical-align:top;padding-top:32px;padding-right:40px;padding-bottom:24px;padding-left:40px;">
        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="" width="100%">
        <tbody>
        <tr>
        <td align="left" class="kl-text" style="font-size:0px;padding:0px;padding-top:0px;padding-right:0px;padding-bottom:0px;padding-left:0px;word-break:break-word;">
        <div style="font-family:Helvetica, Arial, sans-serif;font-size:16px;font-style:normal;font-weight:400;letter-spacing:0px;line-height:1.5;text-align:left;color:#414141;"><p style="text-align: left;"><span style="font-weight: 400; color: rgb(48, 47, 47);">Hallo ${
            buyer.firstName
        },</span></p>
        <p style="text-align: left;"><span style="font-weight: 400; color: rgb(48, 47, 47);">Vielen Dank für Deine Buchung des Geschenkgutscheins! Du erhältst den Geschenkgutschein in einer separaten E-Mail.</span></p>
        <div><span style="font-weight: bold; font-size: 20px;">Buchungsdetails</span></div>
        <div> </div>
        <div><span style="font-weight: bold;">Anlass:</span> ${occasion}</div>
        <div> </div>
        <div><span style="font-weight: bold;">Empfänger:</span> ${recipient.firstName} ${recipient.lastName}</div>
        <div> </div>
        ${messageSection}
        <div><span style="font-weight: bold;">Gutscheinwert:</span> ${formatPrice(balance, '€')}</div>
        <div> </div>
        <div><span style="font-weight: bold;">Wird automatisch an Empfänger per Email zugestellt: <span style="font-weight: 400;">${
            automatedEmailDelivery ? 'Ja' : 'Nein'
        }</span></span></div></div>
        </td>
        </tr>
        </tbody>
        </table>
        </td>
        </tr>
        </tbody>
        </table>
        </div>
        </div>
        <!--[if true]></td><![endif]-->
        </div>
        <!--[if true]></tr></table><![endif]-->
        </div>
        <!--[if mso | IE]></table><![endif]-->
        </td>
        </tr>
        </tbody>
        </table>
        </div>
        <!--[if mso | IE]></td></tr></table></table><![endif]-->
        </td>
        </tr>
        </tbody>
        </table>
        </div>
        <!--[if mso | IE]></td></tr></table><![endif]-->
        </td>
        </tr>
        </tbody>
        </table>
        <table align="center" border="0" cellpadding="0" cellspacing="0" class="kl-section" role="presentation" style="width:100%;">
        <tbody>
        <tr>
        <td>
        <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="kl-section-outlook" style="width:600px;" width="600" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
        <div style="margin:0px auto;max-width:600px;">
        <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
        <tbody>
        <tr>
        <td style="direction:ltr;font-size:0px;padding:0px;text-align:center;">
        <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" bgcolor="#FFFFFF" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
        <div style="background:#FFFFFF;background-color:#FFFFFF;margin:0px auto;border-radius:0px 0px 0px 0px;max-width:600px;">
        <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#FFFFFF;background-color:#FFFFFF;width:100%;border-radius:0px 0px 0px 0px;">
        <tbody>
        <tr>
        <td style="direction:ltr;font-size:0px;padding:20px 0;padding-bottom:0px;padding-left:0px;padding-right:0px;padding-top:0px;text-align:center;">
        <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><![endif]-->
        <div class="content-padding">
        <!--[if true]><table border="0" cellpadding="0" cellspacing="0" width="600" style="width:600px;direction:ltr"><tr><![endif]-->
        <div class="kl-row colstack" style="display:table;table-layout:fixed;width:100%;">
        <!--[if true]><td style="vertical-align:top;width:600px;"><![endif]-->
        <div class="kl-column" style="display:table-cell;vertical-align:top;width:100%;">
        <div class="mj-column-per-100 mj-outlook-group-fix component-wrapper" style="font-size:0px;text-align:left;direction:ltr;vertical-align:top;width:100%;">
        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;" width="100%">
        <tbody>
        <tr>
        <td class="" style="vertical-align:top;padding-top:18px;padding-right:18px;padding-bottom:18px;padding-left:18px;">
        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="" width="100%">
        <tbody>
        <tr>
        <td align="center" style="font-size:0px;padding:0px;word-break:break-word;">
        <p style="padding-bottom:0; border-top:solid 1px #CCC; font-size:1px; margin:0 auto; width:100%">
        </p>
        <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" style="border-top:solid 1px #CCCCCC;font-size:1px;margin:0px auto;width:564px;" role="presentation" width="564px" ><tr><td style="height:0;line-height:0;"> &nbsp;
        </td></tr></table><![endif]-->
        </td>
        </tr>
        </tbody>
        </table>
        </td>
        </tr>
        </tbody>
        </table>
        </div>
        </div>
        <!--[if true]></td><![endif]-->
        </div>
        <!--[if true]></tr></table><![endif]-->
        </div>
        <!--[if mso | IE]></table><![endif]-->
        </td>
        </tr>
        </tbody>
        </table>
        </div>
        <!--[if mso | IE]></td></tr></table></table><![endif]-->
        </td>
        </tr>
        </tbody>
        </table>
        </div>
        <!--[if mso | IE]></td></tr></table><![endif]-->
        </td>
        </tr>
        </tbody>
        </table>
        <table align="center" border="0" cellpadding="0" cellspacing="0" class="kl-section" role="presentation" style="width:100%;">
        <tbody>
        <tr>
        <td>
        <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="kl-section-outlook" style="width:600px;" width="600" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
        <div style="margin:0px auto;max-width:600px;">
        <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
        <tbody>
        <tr>
        <td style="direction:ltr;font-size:0px;padding:0px;text-align:center;">
        <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" bgcolor="#FFFFFF" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
        <div style="background:#FFFFFF;background-color:#FFFFFF;margin:0px auto;border-radius:0px 0px 0px 0px;max-width:600px;">
        <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#FFFFFF;background-color:#FFFFFF;width:100%;border-radius:0px 0px 0px 0px;">
        <tbody>
        <tr>
        <td style="direction:ltr;font-size:0px;padding:20px 0;padding-bottom:0px;padding-left:0px;padding-right:0px;padding-top:0px;text-align:center;">
        <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><![endif]-->
        <div class="content-padding">
        <!--[if true]><table border="0" cellpadding="0" cellspacing="0" width="600" style="width:600px;direction:ltr"><tr><![endif]-->
        <div class="kl-row colstack" style="display:table;table-layout:fixed;width:100%;">
        <!--[if true]><td style="vertical-align:top;width:600px;"><![endif]-->
        <div class="kl-column" style="display:table-cell;vertical-align:top;width:100%;">
        <div class="mj-column-per-100 mj-outlook-group-fix component-wrapper" style="font-size:0px;text-align:left;direction:ltr;vertical-align:top;width:100%;">
        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;" width="100%">
        <tbody>
        <tr>
        <td class="" style="vertical-align:top;padding-top:9px;padding-right:31px;padding-bottom:9px;padding-left:31px;">
        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="" width="100%">
        <tbody>
        <tr>
        <td align="left" class="kl-text" style="font-size:0px;padding:0px;padding-top:0px;padding-right:10px;padding-bottom:0px;padding-left:10px;word-break:break-word;">
        <div style="font-family:Helvetica, Arial, sans-serif;font-size:16px;font-style:normal;font-weight:400;letter-spacing:0px;line-height:1.5;text-align:left;color:#414141;"><table border="0" cellpadding="0" cellspacing="0" class="m_2487831376183497343heading_block m_2487831376183497343block-1" role="presentation" width="100%">
        <tbody>
        <tr>
        <td class="m_2487831376183497343pad">
        <h2 style="font-weight: bold;"><span style="font-size: 18px;">Du hast Fragen?</span></h2>
        </td>
        </tr>
        </tbody>
        </table>
        <table border="0" cellpadding="0" cellspacing="0" class="m_2487831376183497343paragraph_block" role="presentation" width="100%">
        <tbody>
        <tr>
        <td class="m_2487831376183497343pad">
        <div>
        <p style="padding-bottom:0">Kontaktiere uns gerne unter <a href="mailto:contact@people-eat.com" rel="noopener" style="color:#5076D6; font-style:normal; font-weight:700; text-decoration:underline" target="_blank">contact@people-eat.com</a> jederzeit bei Fragen und Anliegen. Unser Team steht dir gerne jederzeit zur Verfügung.</p>
        </div>
        </td>
        </tr>
        </tbody>
        </table>
        <div> </div></div>
        </td>
        </tr>
        </tbody>
        </table>
        </td>
        </tr>
        </tbody>
        </table>
        </div>
        <div class="mj-column-per-100 mj-outlook-group-fix component-wrapper" style="font-size:0px;text-align:left;direction:ltr;vertical-align:top;width:100%;">
        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;" width="100%">
        <tbody>
        <tr>
        <td class="" style="vertical-align:top;padding-top:9px;padding-right:31px;padding-bottom:9px;padding-left:31px;">
        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="" width="100%">
        <tbody>
        <tr>
        <td align="left" class="kl-text" style="font-size:0px;padding:0px;padding-top:0px;padding-right:10px;padding-bottom:0px;padding-left:10px;word-break:break-word;">
        <div style="font-family:Helvetica, Arial, sans-serif;font-size:16px;font-style:normal;font-weight:400;letter-spacing:0px;line-height:1.5;text-align:left;color:#414141;"><p style="line-height: 80%;">Liebe Grüße,</p>
        <p style="padding-bottom:0; line-height:80%">Dein PeopleEat-Team ❤️</p></div>
        </td>
        </tr>
        </tbody>
        </table>
        </td>
        </tr>
        </tbody>
        </table>
        </div>
        </div>
        <!--[if true]></td><![endif]-->
        </div>
        <!--[if true]></tr></table><![endif]-->
        </div>
        <!--[if mso | IE]></table><![endif]-->
        </td>
        </tr>
        </tbody>
        </table>
        </div>
        <!--[if mso | IE]></td></tr></table></table><![endif]-->
        </td>
        </tr>
        </tbody>
        </table>
        </div>
        <!--[if mso | IE]></td></tr></table><![endif]-->
        </td>
        </tr>
        </tbody>
        </table>
        <table align="center" border="0" cellpadding="0" cellspacing="0" class="kl-section" role="presentation" style="width:100%;">
        <tbody>
        <tr>
        <td>
        <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="kl-section-outlook" style="width:600px;" width="600" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
        <div style="margin:0px auto;max-width:600px;">
        <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
        <tbody>
        <tr>
        <td style="direction:ltr;font-size:0px;padding:0px;text-align:center;">
        <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" bgcolor="#FFFFFF" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
        <div style="background:#FFFFFF;background-color:#FFFFFF;margin:0px auto;border-radius:0px 0px 0px 0px;max-width:600px;">
        <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#FFFFFF;background-color:#FFFFFF;width:100%;border-radius:0px 0px 0px 0px;">
        <tbody>
        <tr>
        <td style="direction:ltr;font-size:0px;padding:20px 0;padding-bottom:0px;padding-left:0px;padding-right:0px;padding-top:0px;text-align:center;">
        <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><![endif]-->
        <div class="content-padding">
        <!--[if true]><table border="0" cellpadding="0" cellspacing="0" width="600" style="width:600px;direction:ltr"><tr><![endif]-->
        <div class="kl-row colstack" style="display:table;table-layout:fixed;width:100%;">
        <!--[if true]><td style="vertical-align:top;width:600px;"><![endif]-->
        <div class="kl-column" style="display:table-cell;vertical-align:top;width:100%;">
        <div class="mj-column-per-100 mj-outlook-group-fix component-wrapper" style="font-size:0px;text-align:left;direction:ltr;vertical-align:top;width:100%;">
        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;" width="100%">
        <tbody>
        <tr>
        <td class="" style="vertical-align:top;padding-top:9px;padding-right:18px;padding-bottom:9px;padding-left:18px;">
        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="" width="100%">
        <tbody>
        <tr>
        <td align="left" class="kl-text" style="font-size:0px;padding:0px;padding-top:0px;padding-right:0px;padding-bottom:0px;padding-left:0px;word-break:break-word;">
        <div style="font-family:Helvetica, Arial, sans-serif;font-size:16px;font-style:normal;font-weight:400;letter-spacing:0px;line-height:1.5;text-align:left;color:#414141;"><p style="padding-bottom:0; text-align:center"><span style="color: rgb(167, 167, 167); font-size: 12px;">PeopleEat, Montgolfier-Allee 24, 60486 Frankfurt am Main</span><br/><span style="color: rgb(167, 167, 167); font-size: 12px;">© 2024 | All rights reserved.</span></p></div>
        </td>
        </tr>
        </tbody>
        </table>
        </td>
        </tr>
        </tbody>
        </table>
        </div>
        <div class="mj-column-per-100 mj-outlook-group-fix component-wrapper" style="font-size:0px;text-align:left;direction:ltr;vertical-align:top;width:100%;">
        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;" width="100%">
        <tbody>
        <tr>
        <td class="" style="vertical-align:top;padding-top:32px;padding-right:20px;padding-bottom:32px;padding-left:20px;">
        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="" width="100%">
        <tbody>
        <tr>
        <td>
        <div style="width:100%;text-align:center">
        <!--[if true]><table style="all:unset;opacity:0;" border="0" cellpadding="0" cellspacing="0" ><tr><![endif]-->
        <!--[if !true]><!--><div class="" style="display:inline-block;"><!--<![endif]-->
        <!--[if true]><td style=""><![endif]-->
        <div style="text-align: center;">
        <a href="https://www.instagram.com/peopleeat_official/" style="color:#5076D6; font-style:normal; font-weight:700; text-decoration:underline" target="_blank">
        <img alt="Instagram" src="https://d3k81ch9hvuctc.cloudfront.net/assets/email/buttons/subtle/instagram_96.png" style="width:32px;" width="32"/>
        </a>
        </div>
        <!--[if true]></td><![endif]-->
        <!--[if !true]><!--></div><!--<![endif]-->
        <!--[if true]></tr></table><![endif]-->
        </div>
        </td>
        </tr>
        </tbody>
        </table>
        </td>
        </tr>
        </tbody>
        </table>
        </div>
        </div>
        <!--[if true]></td><![endif]-->
        </div>
        <!--[if true]></tr></table><![endif]-->
        </div>
        <!--[if mso | IE]></table><![endif]-->
        </td>
        </tr>
        </tbody>
        </table>
        </div>
        <!--[if mso | IE]></td></tr></table></table><![endif]-->
        </td>
        </tr>
        </tbody>
        </table>
        </div>
        <!--[if mso | IE]></td></tr></table><![endif]-->
        </td>
        </tr>
        </tbody>
        </table>
        <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
        <div style="margin:0px auto;max-width:600px;">
        <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
        <tbody>
        <tr>
        <td style="direction:ltr;font-size:0px;padding:0px;text-align:center;">
        <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:600px;" ><![endif]-->
        <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;vertical-align:top;width:100%;">
        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;width:100%;" width="100%">
        <tbody>
        <tr>
        <td align="center" class="klBranding" style="font-size:0px;padding:25px 0;word-break:break-word;">
        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;">
        <tbody>
        <tr>
        <td style="width:122px;">
        <a href="https://www.klaviyo.com/?utm_medium=freebie&amp;utm_source=brand&amp;utm_term=SaC624" style="color:#5076D6; font-style:normal; font-weight:700; text-decoration:underline" target="_blank">

        </a>
        </td>
        </tr>
        </tbody>
        </table>
        </td>
        </tr>
        </tbody>
        </table>
        </div>
        <!--[if mso | IE]></td></tr></table><![endif]-->
        </td>
        </tr>
        </tbody>
        </table>
        </div>
        <!--[if mso | IE]></td></tr></table><![endif]-->
        </div>
        </div>
        </body>
    </html>
    `;
}
