import styled from "styled-components";

const Wrapper = styled.div`
  min-height: 100vh;
  background: #f2f5fa;
  display: flex;
  flex-direction: column;
  align-items: center;
`;


const Content = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 2.5rem auto;
  padding: 0 1.5rem 4rem;
  direction: rtl;
  font-family: 'Heebo', sans-serif;
  color: #1b2a45;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 0.4rem;
  color: #1b2a45;
`;

const Subtitle = styled.p`
  color: #64748b;
  font-size: 0.97rem;
  line-height: 1.7;
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.2rem;
  font-weight: 700;
  color: #1b2a45;
  margin: 2rem 0 0.75rem;
  border-bottom: 2px solid #e2e8f2;
  padding-bottom: 0.4rem;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.88rem;
  margin-bottom: 1rem;

  th, td {
    border: 1px solid #e2e8f2;
    padding: 0.55rem 0.85rem;
    text-align: right;
  }
  th {
    background: #f1f5fb;
    font-weight: 700;
    color: #1b2a45;
  }
  tr:nth-child(even) td {
    background: #f8fafc;
  }
  code {
    background: #eff6ff;
    color: #2563eb;
    padding: 0.1em 0.4em;
    border-radius: 4px;
    font-size: 0.83em;
  }
`;

const Note = styled.div`
  background: #fffbeb;
  border: 1px solid #fde68a;
  border-radius: 8px;
  padding: 0.9rem 1.1rem;
  font-size: 0.88rem;
  color: #78350f;
  line-height: 1.7;
  margin: 1rem 0;
  code {
    background: #fef3c7;
    color: #92400e;
    padding: 0.1em 0.4em;
    border-radius: 4px;
    font-size: 0.85em;
  }
`;

const CodeBlock = styled.code`
  display: block;
  background: #f1f5fb;
  border: 1px solid #e2e8f2;
  border-radius: 6px;
  padding: 0.65rem 1rem;
  font-size: 0.82rem;
  color: #1e40af;
  word-break: break-all;
  margin: 0.5rem 0 1rem;
  direction: ltr;
  text-align: left;
`;

const Paragraph = styled.p`
  font-size: 0.92rem;
  color: #334155;
  line-height: 1.75;
  margin: 0.5rem 0;
`;

const AboutPage = () => (
  <Wrapper>
    <Content>
      <Title>שקיפות בכנסת – VoteMate</Title>
      <Subtitle>
        האתר מציג את הצעות החוק שעלו בכנסת ה-25 ומאפשר לכם להצביע בעד / נגד / נמנע.
        לאחר מכן תוכלו לצפות באחוזי ההתאמה שלכם עם כל אחד מחברי הכנסת.
        ניתן לעיין בהצעות, לחפש הצעות, ולצפות בהצבעות של חברי הכנסת.
      </Subtitle>

      <SectionTitle>מבנה הנתונים</SectionTitle>
      <Paragraph>הנתונים מגיעים מתוך קבצי CSV שקיבלנו מאנשי המחשוב של הכנסת.</Paragraph>
      <Table>
        <thead>
          <tr>
            <th>קובץ</th>
            <th>תיאור</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>knesset-votes.csv</code></td>
            <td>כל ההצבעות בכנסת ה-25 – כותרת, תאריך, מזהה פריט, שיטת הצבעה</td>
          </tr>
          <tr>
            <td><code>knesset-member-votes.csv</code></td>
            <td>הצבעת כל חבר כנסת בכל הצבעה (בעד / נגד / נמנע / לא הצביע)</td>
          </tr>
          <tr>
            <td><code>knesset-members.csv</code></td>
            <td>רשימת חברי הכנסת ה-25 – שם, מגדר, סיעה, תאריכי כהונה</td>
          </tr>
          <tr>
            <td><code>knesset-bills.csv</code></td>
            <td>הצעות חוק בכנסת ה-25 – שם, סוג, סטטוס, ועדה מטפלת</td>
          </tr>
        </tbody>
      </Table>

      <SectionTitle>למה אנחנו משתמשים בקבצי CSV ולא ב-OData הרשמי?</SectionTitle>
      <Paragraph>
        לאתר הכנסת קיים API ציבורי בשם OData בכתובת{" "}
        <code style={{ background: "#eff6ff", color: "#2563eb", padding: "0.1em 0.4em", borderRadius: 4, fontSize: "0.85em" }}>
          https://knesset.gov.il/Odata/
        </code>
        .
        ניסינו להשתמש בו, אך נתקלנו בתקלות שמנעו שימוש תקין ועקבי בנתונים.
        לכן בחרנו להשתמש בנתונים מתוך קבצי CSV שקיבלנו ישירות מאנשי המחשוב של הכנסת,
        ולטעון אותם מקומית לתוך מסד הנתונים שלנו.
      </Paragraph>

      <SectionTitle>למה הקישור מוביל לדף ההצבעה ולא לדף הצעת החוק?</SectionTitle>
      <Paragraph>
        בקובץ ההצבעות לכל הצבעה יש עמודת <code style={{ background: "#eff6ff", color: "#2563eb", padding: "0.1em 0.4em", borderRadius: 4, fontSize: "0.85em" }}>Item ID</code> – מזהה שאמור להצביע על הצעת החוק שעליה הצביעו.
        אך בפועל, עבור חלק גדול מההצבעות, אין Item ID תואם בטבלת הצעות החוק.
        זוהי תקלה בנתוני הכנסת עצמם – אין התאמה בין הטבלאות.
      </Paragraph>
      <Paragraph>
        לכן אנחנו משתמשים בנתוני ההצבעות בלבד, וכל הצעה שמוצגת היא בעצם ההצבעה האחרונה
        שקשורה לאותו <code style={{ background: "#eff6ff", color: "#2563eb", padding: "0.1em 0.4em", borderRadius: 4, fontSize: "0.85em" }}>Item ID</code>.
        הקישור בכרטיס ההצבעה מוביל לדף ההצבעה עצמה באתר הכנסת.
      </Paragraph>

      <Note>
        <strong>דוגמאות לחוסר התאמה בנתוני הכנסת</strong><br />
        להלן 3 הצבעות שה-<code>Item ID</code> שלהן אינו קיים כלל בטבלת הצעות החוק:
        <Table style={{ marginTop: "0.75rem", marginBottom: 0 }}>
          <thead>
            <tr>
              <th>מזהה הצבעה</th>
              <th>תאריך</th>
              <th>Item ID</th>
              <th>כותרת ההצבעה</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>37658</td>
              <td>16/11/2022</td>
              <td>2197188</td>
              <td>הודעת יו"ר הוועדה המסדרת על בחירת ועדות זמניות לענייני כספים ולענייני חוץ וביטחון</td>
            </tr>
            <tr>
              <td>37674</td>
              <td>07/12/2022</td>
              <td>2198015</td>
              <td>בחירת סגנים זמניים ליושב ראש הכנסת</td>
            </tr>
            <tr>
              <td>37686</td>
              <td>13/12/2022</td>
              <td>2198226</td>
              <td>בחירת יושב ראש הכנסת ה-25</td>
            </tr>
          </tbody>
        </Table>
      </Note>

      <Paragraph>פורמט הקישור לדף הצבעה:</Paragraph>
      <CodeBlock>
        https://main.knesset.gov.il/Activity/plenum/Votes/Pages/vote.aspx?voteId={"<VOTE_ID>"}
      </CodeBlock>

      <Paragraph style={{ color: "#94a3b8", fontSize: "0.82rem", marginTop: "2.5rem" }}>
        הנתונים מכסים את כנסת ה-25 בלבד.
      </Paragraph>
    </Content>
  </Wrapper>
);

export default AboutPage;
